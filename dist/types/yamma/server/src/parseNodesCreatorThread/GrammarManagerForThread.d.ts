import { MmpRule } from '../grammar/GrammarManager';
export interface IMmpRuleForThread {
    label: string;
    name: string;
    symbols: any[];
}
export declare abstract class GrammarManagerForThread {
    static convertMmpRule(mmpRule: MmpRule): IMmpRuleForThread;
    static convertMmpRules(mmpRules: MmpRule[]): IMmpRuleForThread[];
    static convertMmpRuleForThread(mmpRuleForThread: IMmpRuleForThread): MmpRule;
    static convertMmpRulesForThread(mmpRulesForThread: IMmpRuleForThread[]): MmpRule[];
}
