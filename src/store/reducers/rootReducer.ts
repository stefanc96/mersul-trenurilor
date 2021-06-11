import {TimetableAction, timetableReducer} from './timetable';
import {AppState} from '../store.interface';
import {PayloadAction} from '@reduxjs/toolkit';
import {SettingsAction, settingsReducer} from './settings';

export const rootReducer = (
  state: AppState | undefined,
  action: PayloadAction,
) => {
  return {
    timetable: timetableReducer(
      state?.timetable,
      action as PayloadAction<any, TimetableAction>,
    ),
    settings: settingsReducer(
      state?.settings,
      action as PayloadAction<any, SettingsAction>,
    ),
  };
};
