import {SettingsAction} from './settings.const';

export const setThemeId = (themeId: string) => ({
  type: SettingsAction.SetThemeId,
  payload: {
    themeId,
  },
});

export const setLocaleId = (localeId: string) => ({
  type: SettingsAction.SetLocaleId,
  payload: {
    localeId,
  },
});
