import { GlobalState } from 'yamma-server/src/general/GlobalState';

import {
    IVariableKindConfiguration,
    IExtensionSettings,
} from 'yamma-server/src/mm/ConfigurationManager';

import { UnifierConfig, UnifierConfigComplete } from './unifierDefinitions';
import { defaultConfig } from './defaultConfig';

export const applyDefaultsToConfig = (
    config?: UnifierConfig,
): UnifierConfigComplete => {
    return config
        ? {
              common: { ...defaultConfig.common, ...config.common },
              mm: { ...defaultConfig.mm, ...config.mm },
              unifier: { ...defaultConfig.unifier, ...config.unifier },
          }
        : defaultConfig;
};

export const mapConfigToGlobalState = (
    config: UnifierConfigComplete,
): GlobalState => {
    const variableKindsConfiguration: Map<string, IVariableKindConfiguration> =
        new Map<string, IVariableKindConfiguration>(
            config.common.variableKindsConfig.map((kindConfig) => [
                kindConfig.kind,
                kindConfig,
            ]),
        );

    const lastFetchedSettings: IExtensionSettings = {
        ...config.mm,
        proofMode: config.common.proofMode,
        variableKindsConfiguration: variableKindsConfiguration,
    };

    const globalState: GlobalState = new GlobalState();
    globalState.lastFetchedSettings = lastFetchedSettings;
    return globalState;
};
