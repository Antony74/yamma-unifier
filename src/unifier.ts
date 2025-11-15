import { MmParser } from 'yamma-server/src/mm/MmParser';
import { IMmpParserParams, MmpParser } from 'yamma-server/src/mmp/MmpParser';
import { WorkingVars } from 'yamma-server/src/mmp/WorkingVars';
import { MmpUnifier } from 'yamma-server/src/mmp/MmpUnifier';

import { applyDefaultsToConfig, mapConfigToGlobalState } from './config';

import {
    CreateUnifier,
    ParseMm,
    ParseMmp,
    Unifier,
    UnifierConfig,
    UnifierResult,
} from './unifierDefinitions';

export const createUnifier: CreateUnifier = async (
    mmData: string | MmParser,
    config?: UnifierConfig,
): Promise<Unifier> => {
    const completeConfig = applyDefaultsToConfig(config);

    const mmParser: MmParser =
        typeof mmData === 'string'
            ? await parseMm(mmData, completeConfig)
            : mmData;

    return {
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

        mmParser,
    };
};

export const parseMm: ParseMm = async (
    mmData: string,
    config?: UnifierConfig,
): Promise<MmParser> => {
    const completeConfig = applyDefaultsToConfig(config);

    const mmParser = new MmParser(mapConfigToGlobalState(completeConfig));
    mmParser.ParseText(mmData);
    await mmParser.createParseNodesForAssertionsAsync((message) => {
        if (message.kind === 'progress') {
            console.log(message.index / message.count);
        }
    });

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
