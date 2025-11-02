import { createReadStream, createWriteStream } from 'fs';
import fsp from 'fs/promises';
import zlib from 'zlib';
import { exec } from 'child_process';

import tar from 'tar-stream';
import path from 'path';

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

        createReadStream(inFilename).pipe(zlib.createGunzip()).pipe(extract);
        pack.pipe(zlib.createGzip()).pipe(createWriteStream(outFilename));

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
    const outFilename = 'yamma-server.tgz';
    const dirlist = await fsp.readdir('.');
    const filteredDirlists = dirlist.filter((filename) => {
        const parsedPath = path.parse(filename);
        return parsedPath.ext === '.tgz' && parsedPath.base !== outFilename;
    });

    if (!filteredDirlists.length) {
        const rawFilename = await execCmd(`npm pack github:glacode/yamma`);
        const inFilename = rawFilename.trim();
        await extractYammaServer(inFilename, outFilename);
    }
};

main();
