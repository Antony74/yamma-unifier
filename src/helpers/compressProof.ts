export const compressProof = (
    mandatoryFHyps: string[],
    proof: string[],
): { labels: string[]; proofnumbers: number[] } => {
    const labels: string[] = [];
    const labelToLabelIndexMap = new Map<string, number>();
    const proofnumbers: number[] = [];

    for (const proofStep of proof) {
        // Check if it's a mandatory hypothesis
        const hypothesisIndex = mandatoryFHyps.indexOf(proofStep);
        if (hypothesisIndex !== -1) {
            proofnumbers.push(hypothesisIndex + 1);
            continue;
        }

        // Non-mandatory hypothesis or assertion — look up or add to labels
        const labelIndex = labelToLabelIndexMap.get(proofStep);
        if (labelIndex !== undefined) {
            proofnumbers.push(mandatoryFHyps.length + labelIndex + 1);
        } else {
            labelToLabelIndexMap.set(proofStep, labels.length);
            proofnumbers.push(mandatoryFHyps.length + labels.length + 1);
            labels.push(proofStep);
        }
    }

    return { labels, proofnumbers };
};
