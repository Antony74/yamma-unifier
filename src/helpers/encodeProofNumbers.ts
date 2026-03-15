// Encode an array of proof numbers back into the compressed proof string.
// This is the inverse of getproofnumbers.
// Numbers >= 1 are encoded as base-5 high digits (U-Y) followed by a base-20
// low digit (A-T). 0 is encoded as Z (save tag), placed after the preceding number.
export const encodeProofNumbers = (proofnumbers: number[]): string => {
    let result = '';

    for (const num of proofnumbers) {
        if (num === 0) {
            // Z must follow immediately after the A-T that ended the previous number
            result += 'Z';
            continue;
        }

        // Encode num (>= 1) as optional U-Y prefix digits then one A-T digit
        let n = num;
        const digits: string[] = [];

        // Extract least-significant base-20 digit (1-20 maps to A-T)
        const lsd = ((n - 1) % 20) + 1;
        digits.push(String.fromCharCode('A'.charCodeAt(0) + lsd - 1));
        n = Math.floor((n - lsd) / 20);

        // Extract remaining base-5 digits (1-5 maps to U-Y), most-significant last
        while (n > 0) {
            const d = ((n - 1) % 5) + 1;
            digits.push(String.fromCharCode('U'.charCodeAt(0) + d - 1));
            n = Math.floor((n - d) / 5);
        }

        // digits are least-significant first; reverse to emit most-significant first
        result += digits.reverse().join('');
    }

    return result;
};
