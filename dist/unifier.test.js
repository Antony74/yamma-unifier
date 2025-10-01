"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yamma_unifier_1 = require("yamma-unifier");
const examples_1 = require("./examples");
describe(`yamma-unifier`, () => {
    it(`can unify`, () => {
        const unifier = (0, yamma_unifier_1.createUnifier)(examples_1.exampleFiles['example.mm']);
        const result = unifier.unify(examples_1.exampleFiles['ununified.mmp']);
        expect(result).toEqual(examples_1.exampleFiles['unified.mmp']);
    });
    it(`throws an error given bad mmData`, () => {
        expect(() => (0, yamma_unifier_1.createUnifier)(examples_1.exampleFiles['bad1.mm'])).toThrow(Error);
    });
    it(`throws an error given bad mmpData`, () => {
        const unifier = (0, yamma_unifier_1.createUnifier)(examples_1.exampleFiles['example.mm']);
        expect(() => unifier.unify(examples_1.exampleFiles['bad1.mm'])).toThrow(Error);
    });
});
