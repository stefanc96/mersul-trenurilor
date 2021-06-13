import {
  convertToHoursAndMinutes,
  getArriveDate,
  getTrainStopStatus,
} from '../../../../../utils';
import {chain, noop} from 'lodash';
import {Stop, Train, TrainStopStatus} from '../../../../../types';
import {TrainRide} from '../../../../../store';
import {TRAIN_NOTIFICATION_TIMES} from './TrainDetails.const';
import {Alert, Linking} from 'react-native';
import {strings} from '../../../../../locales';

export const getAvailableStops = (
  stops: Stop[],
  originTime: string,
  destinationTime: string,
  destinationTimeWithDelay: string,
) => {
  return chain(stops)
    .filter((stop, index) => {
      const previousStop = stops[index - 1];
      const arrivalTime = convertToHoursAndMinutes(
        previousStop?.oraS || stop.oraS,
      );
      const leavingTime = convertToHoursAndMinutes(stop.oraP);
      const rideStopStatus = getTrainStopStatus(
        arrivalTime,
        leavingTime,
        originTime,
        destinationTime,
        destinationTimeWithDelay,
      );
      return rideStopStatus === TrainStopStatus.NeedsToArrive;
    })
    .value();
};

export const getTrainNotificationIndex = (
  trainRides: TrainRide[],
  currentTrain: Train,
) => {
  const now = new Date();
  return chain(trainRides)
    .findIndex(trainRide => {
      const trainNumber = trainRide.train.info.numar;

      return (
        trainNumber === currentTrain.info.numar &&
        trainRide.timestamp > now.toISOString()
      );
    })
    .value();
};

export const getTrainNotificationTime = (
  arriveDate: Date,
  notificationDelayTime: number,
) => {
  const minutes = arriveDate.getMinutes();
  const minutesWithDelay = minutes - notificationDelayTime;

  if (minutesWithDelay < 0) {
    const hours = arriveDate.getHours();
    const hoursWithDelay = hours - 1;

    if (hoursWithDelay < 0) {
      arriveDate.setHours(23);
    } else {
      arriveDate.setHours(hoursWithDelay);
    }
    arriveDate.setMinutes(60 + minutesWithDelay);
  } else {
    arriveDate.setMinutes(minutesWithDelay);
  }

  return arriveDate;
};

export const getTimeItems = (
  availableStops: Stop[],
  originTime: string,
  destinationTime: string,
  selectedStationIndex: number,
) => {
  return chain(TRAIN_NOTIFICATION_TIMES)
    .filter(time => {
      const availableStopArriveDate = getArriveDate(
        availableStops[selectedStationIndex],
        originTime,
        destinationTime,
      );
      const availableStopArriveDateWithDelay = getTrainNotificationTime(
        availableStopArriveDate,
        time,
      );
      return (
        availableStopArriveDateWithDelay.toISOString() >
        new Date().toISOString()
      );
    })
    .value();
};

export const handlePermissionReject = () => {
  Alert.alert(strings.openSettings, strings.pleaseEnable, [
    {
      text: strings.settings,
      onPress: () => Linking.openSettings(),
    },
    {
      text: strings.cancel,
      onPress: noop,
    },
  ]);
};
