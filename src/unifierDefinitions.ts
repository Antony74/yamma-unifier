import { IExtensionSettings } from 'yamma-server/src/mm/ConfigurationManager';
import { MmParser } from 'yamma-server/src/mm/MmParser';
import { MmpParser } from 'yamma-server/src/mmp/MmpParser';
import { MmpUnifier } from 'yamma-server/src/mmp/MmpUnifier';

export type UnifierResult = {
    text: string;
    mmpUnifier: MmpUnifier;
    reparseForDiagnostics: () => MmpParser;
};

export type Unifier = {
    unify: (mmpData: string) => UnifierResult;
    mmParser: MmParser;
};

export type VariableKindConfig = {
    kind: string;
    workingVarPrefix: string;
    lspSemantictokenType: 'variable' | 'string' | 'keyword';
};

type MmpUnifierArg = ConstructorParameters<typeof MmpUnifier>[0];

export type MmConfig = Omit<IExtensionSettings, 'variableKindsConfiguration'>;
export type MmpUnifierConfig = Omit<MmpUnifierArg, 'mmpParser'>;

export type UnifierConfigComplete = {
    variableKindsConfig: VariableKindConfig[];
    mm: MmConfig;
    unifier: MmpUnifierConfig;
};

export type UnifierConfig = {
    variableKindsConfig?: VariableKindConfig[];
    mm?: Partial<MmConfig>;
    unifier?: Partial<MmpUnifierConfig>;
};

export type CreateUnifier = (mmData: string, config?: UnifierConfig) => Unifier;
