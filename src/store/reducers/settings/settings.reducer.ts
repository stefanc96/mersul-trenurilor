import {PayloadAction} from '@reduxjs/toolkit';
import {SettingsAction} from './settings.const';
import {SettingsState} from '../../store.interface';

const initialState: SettingsState = {
  themeId: null,
  localeId: 'ro',
  trainRides: [],
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
        localeId: action.payload.localeId,
      };
    case SettingsAction.AddTrainRide:
      state?.trainRides?.push?.(action.payload.trainRide);
      console.log(action.payload.trainRide);

      return {
        ...state,
      };
    case SettingsAction.RemoveTrainRide:
      return {
        ...state,
        trainRides: state?.trainRides.filter(
          (trainRide, index) => index !== action.payload.trainRideIndex,
        ),
      };
    default:
      return state;
  }
};
