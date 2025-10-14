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

export type UnifierResult = { text: string; mmpUnifier: MmpUnifier };

export type Unifier = {
    unify: (mmpData: string) => UnifierResult;
    mmParser: MmParser;
};

export type VariableKindConfig = {
    kind: string;
    workingVarPrefix: string;
    lspSemantictokenType: 'variable' | 'string' | 'keyword';
};

export type UnifierConfig = Omit<
    IExtensionSettings,
    'variableKindsConfiguration'
> & { variableKindsConfig: VariableKindConfig[] };

export type CreateUnifier = (
    mmData: string,
    config?: Partial<UnifierConfig>,
) => Unifier;

const mapConfig = (config: UnifierConfig): GlobalState => {
    const variableKindsConfiguration: Map<string, IVariableKindConfiguration> =
        new Map<string, IVariableKindConfiguration>(
            config.variableKindsConfig.map((kindConfig) => [
                kindConfig.kind,
                kindConfig,
            ]),
        );

    const lastFetchedSettings: IExtensionSettings = {
        ...config,
        variableKindsConfiguration: variableKindsConfiguration,
    };

    const globalState: GlobalState = new GlobalState();
    globalState.lastFetchedSettings = lastFetchedSettings;
    return globalState;
};

const defaultConfig: UnifierConfig = {
    maxNumberOfProblems: 100,
    mmFileFullPath: '',
    disjVarAutomaticGeneration: DisjVarAutomaticGeneration.GenerateNone,
    proofMode: ProofMode.normal,
    labelsOrderInCompressedProof:
        LabelsOrderInCompressedProof.mostReferencedFirstAndNiceFormatting,
    diagnosticMessageForSyntaxError: DiagnosticMessageForSyntaxError.short,
    variableKindsConfig: [
        {
            kind: 'wff',
            workingVarPrefix: 'W',
            lspSemantictokenType: 'variable',
        },
        {
            kind: 'setvar',
            workingVarPrefix: 'S',
            lspSemantictokenType: 'string',
        },
        {
            kind: 'class',
            workingVarPrefix: 'C',
            lspSemantictokenType: 'keyword',
        },
    ],
};

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
                maxNumberOfHypothesisDispositionsForStepDerivation: 0,
                renumber: false,
                removeUnusedStatements: false,
            });

            mmpUnifier.unify();

            return { text: mmpUnifier.textEditArray[0].newText, mmpUnifier };
        },

        mmParser,
    };
};
