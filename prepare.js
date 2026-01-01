const { exec } = require('child_process');
const fsp = require('fs/promises');
const path = require('path');

const execCmd = (command, options) => {
    console.log(command);

    return new Promise((resolve, reject) => {
        exec(command, { env: process.env, ...options }, (error, stdout) => {
            if (error) {
                reject(error);
            } else {
                resolve(stdout);
            }
        });
    });
};

const main = async () => {
    try {
        await fsp.lstat('.git');
    } catch (_e) {
        // We're not running from this project's git repo, no action is needed
        return;
    }

    await execCmd(`git submodule update --init --recursive`);
    await execCmd(`npm install`, { cwd: 'yamma' });

    try {
        await execCmd(`npm run compile`, { cwd: 'yamma' });
    } catch (_e) {}
};

main();
