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

export const createUnifier: CreateUnifier = (
    mmData: string | MmParser,
    config?: UnifierConfig,
): Unifier => {
    const completeConfig = applyDefaultsToConfig(config);

    const mmParser: MmParser =
        typeof mmData === 'string' ? parseMm(mmData, completeConfig) : mmData;

    return {
        unify: (mmpData: string | MmpParser): UnifierResult => {
            const mmpParser: MmpParser =
                typeof mmpData === 'string'
                    ? parseMmp(mmpData, mmParser, completeConfig)
                    : mmpData;

            const mmpUnifier = new MmpUnifier({
                mmpParser,
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

export const parseMm: ParseMm = (
    mmData: string,
    config?: UnifierConfig,
): MmParser => {
    const completeConfig = applyDefaultsToConfig(config);

    const mmParser = new MmParser(mapConfigToGlobalState(completeConfig));
    mmParser.ParseText(mmData);
    mmParser.createParseNodesForAssertionsSync();

    return mmParser;
};

export const parseMmp: ParseMmp = (
    mmpData: string,
    mmParser: MmParser,
    config?: UnifierConfig,
): MmpParser => {
    const completeConfig = applyDefaultsToConfig(config);

    const kindToPrefixMap = new Map<string, string>(
        completeConfig.variableKindsConfig.map((kind) => {
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

