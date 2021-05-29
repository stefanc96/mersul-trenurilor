import {TimetableAction} from './timetable.const';
import {PayloadAction} from '@reduxjs/toolkit';
import {TimetableInfo} from '../../../types';

const initialState: TimetableInfo = {
  metadata: undefined,
  trains: [],
  stations: [],
};

export const timetableReducer = (
  state = initialState,
  action: PayloadAction<any, TimetableAction>,
) => {
  switch (action.type as TimetableAction) {
    case TimetableAction.SetTimetableInfo:
      return {
        ...action.payload.timetableInfo,
        ...state,
      };
    default:
      return state;
  }
};
