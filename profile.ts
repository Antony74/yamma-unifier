import { exec, spawn } from 'child_process';
import fsp from 'fs/promises';
import path from 'path';

const profileCmd = `node --inspect --prof dist/index.js unify /set.mm/set.mm`;

const execCmd = (command: string): Promise<string> => {
    console.log(command);

    return new Promise((resolve, reject) => {
        exec(command, { env: process.env }, (error, stdout, stderr) => {
            console.log(JSON.stringify([error, stdout, stderr], null, 4));
            resolve(stdout);
        });
    });
};

const clean = async () => {
    const dirlist = await fsp.readdir(__dirname);

    for (const item of dirlist) {
        if (item.startsWith('isolate-') || item.startsWith('profile-')) {
            const filename = path.join(__dirname, item);
            console.log(`removing ${filename}`);
            await fsp.rm(filename);
        }
    }
};

const profile = (): Promise<void> => {
    console.log(profileCmd);

    return new Promise((resolve) => {
        const yamma = spawn(profileCmd, {
            stdio: 'inherit',
            shell: true,
        });

        yamma.on('close', resolve);
    });
};

const main = async () => {
    await clean();
    await profile();

    const dirlist = await fsp.readdir(__dirname);

    for (const item of dirlist) {
        if (item.startsWith('isolate-')) {
            const logFilename = path.join(__dirname, item);
            const profileFilename = path.join(
                __dirname,
                item.replace('isolate-', 'profile-').replace('.log', '.txt'),
            );
            await execCmd(
                `node --prof-process ${logFilename} > ${profileFilename}`,
            );
        }
    }
};

main();
