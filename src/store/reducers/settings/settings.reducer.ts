import {PayloadAction} from '@reduxjs/toolkit';
import {SettingsAction} from './settings.const';
import {SettingsState} from '../../store.interface';

const initialState: SettingsState = {
  themeId: null,
  localeId: 'ro',
};

export const settingsReducer = (
  state = initialState,
  action: PayloadAction<any, SettingsAction>,
) => {
  switch (action.type as SettingsAction) {
    case SettingsAction.SetThemeId:
      return {
        ...state,
        themeId: action.payload.themeId,
      };
    case SettingsAction.SetLocaleId:
      return {
        ...state,
        ...action.payload.localeId,
      };
    default:
      return state;
  }
};
