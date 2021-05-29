import {TimetableAction, timetableReducer} from './timetable';
import {AppState} from '../store.interface';
import {PayloadAction} from '@reduxjs/toolkit';

export const rootReducer = (
  state: AppState | undefined,
  action: PayloadAction,
) => {
  return {
    timetable: timetableReducer(
      state?.timetable,
      action as PayloadAction<any, TimetableAction>,
    ),
  };
};
