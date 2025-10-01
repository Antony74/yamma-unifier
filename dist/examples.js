"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exampleFiles = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const yamma_unifier_1 = require("yamma-unifier");
Object.defineProperty(exports, "exampleFiles", { enumerable: true, get: function () { return yamma_unifier_1.exampleFiles; } });
Object.entries(yamma_unifier_1.exampleFiles).forEach(([filename, content]) => {
    const filePath = path_1.default.join(__dirname, '..', 'examples', filename);
    promises_1.default.writeFile(filePath, content);
});
