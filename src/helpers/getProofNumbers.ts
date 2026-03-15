// Get the raw numbers from compressed proof format.
// The letter Z is translated as 0.
export const getProofNumbers = (label: string, proof: string): number[] => {
    const proofnumbers: number[] = [];
    let num = 0;
    let justGotNum = false;
    for (const item of proof) {
        if (item <= 'T') {
            const addval: number = item.charCodeAt(0) - ('A'.charCodeAt(0) - 1);

            if (num > Number.MAX_SAFE_INTEGER / 20 || 20 * num > Number.MAX_SAFE_INTEGER - addval) {
                throw new Error('Overflow computing numbers in compressed proof of ' + label);
            }

            proofnumbers.push(20 * num + addval);
            num = 0;
            justGotNum = true;
        } else if (item <= 'Y') {
            const addval: number = item.charCodeAt(0) - 'T'.charCodeAt(0);

            if (num > Number.MAX_SAFE_INTEGER / 5 || 5 * num > Number.MAX_SAFE_INTEGER - addval) {
                throw new Error('Overflow computing numbers in compressed proof of ' + label);
            }

            num = 5 * num + addval;
            justGotNum = false;
        } // It must be Z
        else {
            if (!justGotNum) {
                throw new Error('Stray Z found in compressed proof of ' + label);
            }

            proofnumbers.push(0);
            justGotNum = false;
        }
    }

    if (num !== 0) {
        throw new Error('Compressed proof of theorem ' + label + ' ends in unfinished number');
    }

    return proofnumbers;
};
