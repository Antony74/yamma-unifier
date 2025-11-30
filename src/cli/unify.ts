import fsp from 'fs/promises';
import { parseMmp } from '../api/unifier';
import { getDiagnosticsString, info } from './diagnosticsString';
import { Unifier } from '../api/unifierDefinitions';

export const unify = async (unifier: Unifier, mmpFilenames: string[]) => {
    for (const mmpFilename of mmpFilenames) {
        info(`reading ${mmpFilename}`);

        const mmpUnunifiedData = await fsp.readFile(mmpFilename, {
            encoding: 'utf-8',
        });

        info(`unifying ${mmpFilename}`);
        const result = unifier.unify(mmpUnunifiedData);

        const diagnosticsString = getDiagnosticsString(
            mmpFilename,
            parseMmp(result.text, unifier.mmParser),
        );

        if (diagnosticsString) {
            console.log();
            console.log(diagnosticsString);
            console.log();
        }

        info(`writing ${mmpFilename}`);
        await fsp.writeFile(mmpFilename, result.text);
    }
};
