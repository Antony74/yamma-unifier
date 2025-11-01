import fs from 'fs';
import zlib from 'zlib';
import { exec } from 'child_process';

import tar from 'tar-stream';

const execCmd = async (cmd: string) => {
    console.log(cmd);

    return new Promise<string>((resolve, reject) => {
        exec(cmd, (error, stdout) => {
            if (error) {
                reject(error);
            } else {
                resolve(stdout);
            }
        });
    });
};

const extractYammaServer = async (inFilename: string, outFilename: string) => {
    console.log(inFilename);

    return new Promise<void>((resolve) => {
        const searchString = 'package/server/';

        const extract = tar.extract();
        const pack = tar.pack();

        fs.createReadStream(inFilename).pipe(zlib.createGunzip()).pipe(extract);
        pack.pipe(zlib.createGzip()).pipe(fs.createWriteStream(outFilename));

        extract.on('entry', function (header, stream, next) {
            console.log(header.name);

            if (header.name.startsWith('package/server/')) {
                const name = header.name.replace(searchString, 'package/');
                stream.pipe(pack.entry({ ...header, name }, next));
            } else {
                stream.resume();
                next();
            }
        });

        extract.on('finish', () => {
            console.log(outFilename);
            pack.finalize();
            resolve();
        });
    });
};

const main = async () => {
    const rawFilename = await execCmd(`npm pack github:glacode/yamma`);
    const inFilename = rawFilename.trim();
    const outFilename = 'yamma-server.tgz';
    await extractYammaServer(inFilename, outFilename);
};

main();
