import { ProofMode } from 'yamma-server/src/mm/ConfigurationManager';
import { MmParser } from 'yamma-server/src/mm/MmParser';
import { IMmpParserParams, MmpParser } from 'yamma-server/src/mmp/MmpParser';
import { WorkingVars } from 'yamma-server/src/mmp/WorkingVars';
import { MmpUnifier } from 'yamma-server/src/mmp/MmpUnifier';
import {
    CreateUnifier,
    Unifier,
    UnifierConfig,
    UnifierResult,
} from './unifierDefinitions';
import { defaultConfig, mapConfig } from './config';

export const createUnifier: CreateUnifier = (
    mmData: string,
    config?: Partial<UnifierConfig>,
): Unifier => {
    const completeConfig = { ...defaultConfig, ...config };

    const kindToPrefixMap = new Map<string, string>(
        completeConfig.variableKindsConfig.map((kind) => {
            return [kind.kind, kind.workingVarPrefix];
        }),
    );

    const mmParser = new MmParser(mapConfig(completeConfig));
    mmParser.ParseText(mmData);
    mmParser.createParseNodesForAssertionsSync();

    return {
        unify: (mmpData: string): UnifierResult => {
            const mmpParserParams: IMmpParserParams = {
                textToParse: mmpData,
                mmParser,
                workingVars: new WorkingVars(kindToPrefixMap),
            };
            const mmpParser: MmpParser = new MmpParser(mmpParserParams);
            mmpParser.parse();

            const mmpUnifier = new MmpUnifier({
                mmpParser: mmpParser,
                proofMode: ProofMode.normal,
                maxNumberOfHypothesisDispositionsForStepDerivation: 100000,
                renumber: false,
                removeUnusedStatements: false,
            });

            const log = console.log;
            console.log = () => {}; // Disable logging

            mmpUnifier.unify();

            console.log = log; // Re-enable logging

            return { text: mmpUnifier.textEditArray[0].newText, mmpUnifier };
        },

        mmParser,
    };
};
