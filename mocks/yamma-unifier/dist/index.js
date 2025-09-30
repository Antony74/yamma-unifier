"use strict";
// This is just a mock
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUnifier = exports.exampleFiles = void 0;
const examples_1 = require("./examples");
Object.defineProperty(exports, "exampleFiles", { enumerable: true, get: function () { return examples_1.exampleFiles; } });
const createUnifier = (mmData) => {
    if (mmData === examples_1.exampleFiles['example.mm']) {
        return {
            unify: (mmpData) => {
                mmpData = mmpData.replaceAll('\r', '');
                if (mmpData === examples_1.exampleFiles['ununified.mmp'] ||
                    mmpData === examples_1.exampleFiles['unified.mmp']) {
                    return examples_1.exampleFiles['unified.mmp'];
                }
                else {
                    throw new Error('unify: called with mmpData which yamma-unifier mock did not recognize');
                }
            },
        };
    }
    else {
        throw new Error('createUnifier: called with mmData which yamma-unifier mock did not recognize');
    }
};
exports.createUnifier = createUnifier;
//# sourceMappingURL=index.js.map