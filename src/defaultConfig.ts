import DiagnosticMessageForSyntaxError, {
    DisjVarAutomaticGeneration,
    ProofMode,
    LabelsOrderInCompressedProof,
} from 'yamma-server/src/mm/ConfigurationManager';

import { UnifierConfigComplete } from './unifierDefinitions';

export const defaultConfig: UnifierConfigComplete = {
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
    mm: {
        maxNumberOfProblems: 100,
        mmFileFullPath: '',
        disjVarAutomaticGeneration: DisjVarAutomaticGeneration.GenerateNone,
        proofMode: ProofMode.normal,
        labelsOrderInCompressedProof:
            LabelsOrderInCompressedProof.mostReferencedFirstAndNiceFormatting,
        diagnosticMessageForSyntaxError: DiagnosticMessageForSyntaxError.short,
    },
    unifier: {
        proofMode: ProofMode.normal,
        maxNumberOfHypothesisDispositionsForStepDerivation: 100000,
        renumber: false,
        removeUnusedStatements: false,
    },
};
