import {SettingsAction} from './settings.const';
import {TrainRide} from '../../store.interface';

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

export const addTrainRide = (trainRide: TrainRide) => ({
  type: SettingsAction.AddTrainRide,
  payload: {
    trainRide,
  },
});

export const removeTrainRide = (trainRideIndex: number) => ({
  type: SettingsAction.RemoveTrainRide,
  payload: {
    trainRideIndex,
  },
});
