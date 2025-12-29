import DiagnosticMessageForSyntaxError, {
    DisjVarAutomaticGeneration,
    ProofMode,
    LabelsOrderInCompressedProof,
} from 'yamma-server/src/mm/ConfigurationManager';

import { UnifierConfigComplete } from './unifierDefinitions';

export const defaultConfig: UnifierConfigComplete = {
    common: {
        proofMode: ProofMode.compressed,
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
    },
    mm: {
        maxNumberOfProblems: 100,
        mmFileFullPath: '',
        disjVarAutomaticGeneration: DisjVarAutomaticGeneration.GenerateNone,
        labelsOrderInCompressedProof:
            LabelsOrderInCompressedProof.mostReferencedFirstAndNiceFormatting,
        diagnosticMessageForSyntaxError: DiagnosticMessageForSyntaxError.short,
        progressCallback: () => {},
        singleThread: false,
    },
    unifier: {
        maxNumberOfHypothesisDispositionsForStepDerivation: 100000,
        renumber: true,
        removeUnusedStatements: true,
        getProofStripHeader: true,
    },
};
