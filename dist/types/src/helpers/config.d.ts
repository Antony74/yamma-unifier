import { GlobalState } from '../../yamma/server/src/general/GlobalState';
import { UnifierConfig, UnifierConfigComplete } from '../unifierDefinitions';
export declare const applyDefaultsToConfig: (config?: UnifierConfig) => UnifierConfigComplete;
export declare const mapConfigToGlobalState: (config: UnifierConfigComplete) => GlobalState;
