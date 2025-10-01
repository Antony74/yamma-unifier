#!/usr/bin/env node
"use strict";
// e.g. npm start examples/example.mm examples/ununified.mmp
// e.g. yammau examples/example.mm examples/ununified.mmp
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = __importDefault(require("fs/promises"));
const yamma_unifier_1 = require("yamma-unifier");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    if (process.argv.length < 3) {
        console.error('usage: yammau file.mm file.mmp [...moreFiles.mmp]');
        process.exit(1);
    }
    const [_program, _script, mmFilename, ...mmpFilenames] = process.argv;
    try {
        console.log(`reading ${mmFilename}`);
        const mmData = yield promises_1.default.readFile(mmFilename, { encoding: 'utf-8' });
        console.log(`parsing ${mmFilename}`);
        const unifier = (0, yamma_unifier_1.createUnifier)(mmData);
        for (const mmpFilename of mmpFilenames) {
            console.log(`reading ${mmpFilename}`);
            const mmpUnunifiedData = yield promises_1.default.readFile(mmpFilename, {
                encoding: 'utf-8',
            });
            console.log(`unifying ${mmpFilename}`);
            const mmpUnifiedData = unifier.unify(mmpUnunifiedData);
            console.log(`writing ${mmpFilename}`);
            yield promises_1.default.writeFile(mmpFilename, mmpUnifiedData);
        }
    }
    catch (e) {
        if (e instanceof Error) {
            console.error(e.message);
            process.exit(1);
        }
        else {
            throw e;
        }
    }
    console.log('done');
});
main();
