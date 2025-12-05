import fsp from 'fs/promises';
import { parseMmp } from '../api/unifier';
import { getDiagnosticsString, info } from './diagnosticsString';
import { Unifier, UnifierResult } from '../api/unifierDefinitions';

export const processUnifierResult = async (
    result: UnifierResult,
    mmpFilename: string,
) => {
    const diagnosticsString = getDiagnosticsString(mmpFilename, result.mmpUnifier.mmpParser);

    if (diagnosticsString) {
        console.log();
        console.log(diagnosticsString);
        console.log();
    }

    info(`writing ${mmpFilename}`);
    await fsp.writeFile(mmpFilename, result.text);
};

export const unify = async (unifier: Unifier, mmpFilenames: string[]) => {
    for (const mmpFilename of mmpFilenames) {
        info(`reading ${mmpFilename}`);

        const mmpUnunifiedData = await fsp.readFile(mmpFilename, {
            encoding: 'utf-8',
        });

        info(`unifying ${mmpFilename}`);
        const result = unifier.unify(mmpUnunifiedData);

        // Re-parse the mmp file because we need the diagnostics from after unification rather than before
        const mmpParser = parseMmp(result.text, unifier.mmParser);
        result.mmpUnifier.mmpParser = mmpParser;

        await processUnifierResult(result, mmpFilename);
    }
};
