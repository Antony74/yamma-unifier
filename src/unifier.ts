import DiagnosticMessageForSyntaxError, {
    DisjVarAutomaticGeneration,
    IExtensionSettings,
    IVariableKindConfiguration,
    LabelsOrderInCompressedProof,
    ProofMode,
} from 'yamma-server/src/mm/ConfigurationManager';

import { GlobalState } from 'yamma-server/src/general/GlobalState';
import { MmParser } from 'yamma-server/src/mm/MmParser';
import { IMmpParserParams, MmpParser } from 'yamma-server/src/mmp/MmpParser';
import { WorkingVars } from 'yamma-server/src/mmp/WorkingVars';
import { MmpUnifier } from 'yamma-server/src/mmp/MmpUnifier';

export type Unifier = { unify: (mmpData: string) => string };
export type CreateUnifier = (mmData: string) => Unifier;

const variableKindsConfiguration: Map<string, IVariableKindConfiguration> =
    new Map<string, IVariableKindConfiguration>();

variableKindsConfiguration.set('wff', {
    workingVarPrefix: 'W',
    lspSemantictokenType: 'variable',
});

variableKindsConfiguration.set('setvar', {
    workingVarPrefix: 'S',
    lspSemantictokenType: 'string',
});

variableKindsConfiguration.set('class', {
    workingVarPrefix: 'C',
    lspSemantictokenType: 'keyword',
});

export const lastFetchedSettings: IExtensionSettings = {
    maxNumberOfProblems: 100,
    mmFileFullPath: '',
    disjVarAutomaticGeneration: DisjVarAutomaticGeneration.GenerateNone,
    proofMode: ProofMode.normal,
    labelsOrderInCompressedProof:
        LabelsOrderInCompressedProof.mostReferencedFirstAndNiceFormatting,
    diagnosticMessageForSyntaxError: DiagnosticMessageForSyntaxError.short,
    variableKindsConfiguration: variableKindsConfiguration,
};

export const globalState: GlobalState = new GlobalState();
globalState.lastFetchedSettings = lastFetchedSettings;

export const kindToPrefixMap: Map<string, string> = new Map<string, string>();
kindToPrefixMap.set('wff', 'W');
kindToPrefixMap.set('class', 'C');
kindToPrefixMap.set('setvar', 'S');

export const createUnifier: CreateUnifier = (mmData: string) => {
    const mp2MmParser = new MmParser(globalState);
    mp2MmParser.ParseText(mmData);
    mp2MmParser.createParseNodesForAssertionsSync();

    return {
        unify: (mmpData: string) => {
            const mmpParserParams: IMmpParserParams = {
                textToParse: mmpData,
                mmParser: mp2MmParser,
                workingVars: new WorkingVars(kindToPrefixMap),
            };
            const mmpParser: MmpParser = new MmpParser(mmpParserParams);
            mmpParser.parse();

            const mmpUnifier = new MmpUnifier({
                mmpParser: mmpParser,
                proofMode: ProofMode.normal,
                maxNumberOfHypothesisDispositionsForStepDerivation: 0,
                renumber: false,
                removeUnusedStatements: false,
            });

            mmpUnifier.unify();

            const textEdit = mmpUnifier.textEditArray[0];

            return textEdit.newText;
        },
    };
};
