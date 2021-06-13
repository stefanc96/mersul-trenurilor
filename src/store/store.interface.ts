import {TimetableInfo, Train} from '../types';

export interface SettingsState {
  themeId: string | null;
  localeId: string;
  trainRides: TrainRide[];
}

export type TrainRide = {
  train: Train;
  timestamp: string;
};

export type AppState = {
  timetable: TimetableInfo;
  settings: SettingsState;
};
