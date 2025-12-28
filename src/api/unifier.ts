import { MmParser } from 'yamma-server/src/mm/MmParser';
import { IMmpParserParams, MmpParser } from 'yamma-server/src/mmp/MmpParser';
import { WorkingVars } from 'yamma-server/src/mmp/WorkingVars';
import { MmpUnifier } from 'yamma-server/src/mmp/MmpUnifier';

import { applyDefaultsToConfig, mapConfigToGlobalState } from './common/config';

import {
    CreateUnifier,
    ParseMm,
    ParseMmp,
    Unifier,
    UnifierConfig,
    UnifierResult,
} from './unifierDefinitions';
import { monitorMmParser } from '../cli/heapStatistics';

export const createUnifier: CreateUnifier = (
    mmData: string | MmParser,
    config?: UnifierConfig,
): Unifier => {
    const completeConfig = applyDefaultsToConfig(config);

    const mmParser: MmParser =
        typeof mmData === 'string'
            ? parseMm(mmData, completeConfig)
            : mmData;

    const unifier: Unifier = {
        unify: (mmpData: string | MmpParser): UnifierResult => {
            const mmpParser: MmpParser =
                typeof mmpData === 'string'
                    ? parseMmp(mmpData, mmParser, completeConfig)
                    : mmpData;

            const mmpUnifier = new MmpUnifier({
                mmpParser,
                proofMode: completeConfig.common.proofMode,
                ...completeConfig.unifier,
            });

            mmpUnifier.unify();

            const result = {
                text: mmpUnifier.textEditArray[0].newText,
                mmpUnifier,
            };

            return result;
        },

        get: (proofId: string): UnifierResult => {
            const text = `$getproof ${proofId}`;
            const result = unifier.unify(text);

            let mmpParser = result.mmpUnifier.mmpParser;

            if (
                result.text.includes(text) &&
                mmpParser.diagnostics.length === 0
            ) {
                mmpParser.diagnostics.push({
                    severity: 1,
                    range: {
                        start: { line: 0, character: 0 },
                        end: { line: 0, character: text.length },
                    },
                    message: `${proofId} not found`,
                });
                return result;
            }

            mmpParser = parseMmp(result.text, mmParser, completeConfig);

            if (
                completeConfig.unifier.getProofStripHeader &&
                mmpParser.diagnostics.length === 1 &&
                mmpParser.diagnostics[0].code === 'missingComment'
            ) {
                result.text = result.text.split('\n').slice(3).join('\n');

                mmpParser = parseMmp(result.text, mmParser, completeConfig);
            }

            return unifier.unify(result.text);
        },

        deepParse: async () => {
            if (completeConfig.mm.singleThread) {
                mmParser.createParseNodesForAssertionsSync(
                    completeConfig.mm.progressCallback,
                );
            } else {
                await mmParser.createParseNodesForAssertionsAsync(
                    completeConfig.mm.progressCallback,
                );
            }
        },

        mmParser,
    };

    return unifier;
};

export const parseMm: ParseMm = (
    mmData: string,
    config?: UnifierConfig,
): MmParser => {
    const completeConfig = applyDefaultsToConfig(config);

    const mmParser = new MmParser(mapConfigToGlobalState(completeConfig));
    monitorMmParser(mmParser);

    mmParser.ParseText(mmData);

    return mmParser;
};

export const parseMmp: ParseMmp = (
    mmpData: string,
    mmParser: MmParser,
    config?: UnifierConfig,
): MmpParser => {
    const completeConfig = applyDefaultsToConfig(config);

    const kindToPrefixMap = new Map<string, string>(
        completeConfig.common.variableKindsConfig.map((kind) => {
            return [kind.kind, kind.workingVarPrefix];
        }),
    );

    const mmpParserParams: IMmpParserParams = {
        textToParse: mmpData,
        mmParser,
        workingVars: new WorkingVars(kindToPrefixMap),
    };
    const mmpParser: MmpParser = new MmpParser(mmpParserParams);
    mmpParser.parse();
    return mmpParser;
};
