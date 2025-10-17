import { GlobalState } from "yamma-server/src/general/GlobalState";
import DiagnosticMessageForSyntaxError, { IVariableKindConfiguration, IExtensionSettings, DisjVarAutomaticGeneration, ProofMode, LabelsOrderInCompressedProof } from "yamma-server/src/mm/ConfigurationManager";
import { UnifierConfig } from "./unifierDefinitions";

export const mapConfig = (config: UnifierConfig): GlobalState => {
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

export const defaultConfig: UnifierConfig = {
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
