import {TimetableInfo} from '../../../types';
import {TimetableAction} from './timetable.const';

export const setTimetableInfo = (timetableInfo: TimetableInfo) => ({
  type: TimetableAction.SetTimetableInfo,
  payload: {
    timetableInfo,
  },
});
