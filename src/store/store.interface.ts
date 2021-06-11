import {TimetableInfo} from '../types';

export interface SettingsState {
  themeId: string | null;
  localeId: string;
}

export type AppState = {
  timetable: TimetableInfo;
  settings: SettingsState;
};
