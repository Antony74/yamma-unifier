import { IExtensionSettings } from "yamma-server/src/mm/ConfigurationManager";
import { MmParser } from "yamma-server/src/mm/MmParser";
import { MmpUnifier } from "yamma-server/src/mmp/MmpUnifier";

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
