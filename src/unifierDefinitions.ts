import {
    IExtensionSettings,
    ProofMode,
} from '../yamma/server/src/mm/ConfigurationManager';
import { MmParser } from '../yamma/server/src/mm/MmParser';
import { MmpParser } from '../yamma/server/src/mmp/MmpParser';
import { MmpUnifier, MmpUnifierArgs } from '../yamma/server/src/mmp/MmpUnifier';
import { ProgressCallback } from '../yamma/server/src/parseNodesCreatorThread/ParseNodesCreator';

export type UnifierResult = {
    text: string;
    mmpUnifier: MmpUnifier;
};

export type Unifier = {
    unify: (mmpData: string | MmpParser) => UnifierResult;
    get: (proofId: string) => UnifierResult;
    deepParse: () => Promise<void>;
    mmParser: MmParser;
};

export type VariableKindConfig = {
    kind: string;
    workingVarPrefix: string;
    lspSemantictokenType: 'variable' | 'string' | 'keyword';
};

export type CreateMmParser = (...params: ConstructorParameters<typeof MmParser>) => MmParser;

export type MmConfig = Omit<
    IExtensionSettings & {
        progressCallback: ProgressCallback;
        singleThread: boolean;
        createMmParser: CreateMmParser;
    },
    'variableKindsConfiguration' | 'proofMode'
>;

export type MmpUnifierConfig = Omit<
    MmpUnifierArgs & { getProofStripHeader: boolean },
    'mmpParser' | 'proofMode'
>;

type UnifierConfigCommon = {
    proofMode: ProofMode;
    variableKindsConfig: VariableKindConfig[];
};

export type UnifierConfigComplete = {
    common: UnifierConfigCommon;
    mm: MmConfig;
    unifier: MmpUnifierConfig;
};

export type UnifierConfig = {
    common?: Partial<UnifierConfigCommon>;
    mm?: Partial<MmConfig>;
    unifier?: Partial<MmpUnifierConfig>;
};

export type CreateUnifier = (
    mmData: string | MmParser,
    config?: UnifierConfig,
) => Unifier;

export type ParseMm = (mmData: string, config?: UnifierConfig) => MmParser;

export type ParseMmp = (
    mmpData: string,
    mmParser: MmParser,
    config?: UnifierConfig,
) => MmpParser;
