import {TrainStopStatus, TrainTime} from '../types';

export function convertToHoursAndMinutes(value: string) {
  const {hours, minutes} = getHoursAndMinutes(value);

  return (
    convertNumberToTimeFormat(hours) + ':' + convertNumberToTimeFormat(minutes)
  );
}

export function convertToHoursAndMinutesWidthDelay(
  value: string,
  delayedHours = 0,
  delayedMinutes = 0,
) {
  const {hours, minutes} = getHoursAndMinutes(value);

  return (
    convertNumberToTimeFormat(hours + delayedHours) +
    ':' +
    convertNumberToTimeFormat(minutes + delayedMinutes)
  );
}

export function getHoursAndMinutes(value: string): TrainTime {
  const sec = parseInt(value, 10);
  let hours = Math.floor(sec / 3600);
  let minutes = Math.floor((sec - hours * 3600) / 60);
  if (hours === 24) {
    hours = 0;
  }
  return {
    hours,
    minutes,
  };
}

export const getTrainStopStatus = (
  arrivingTime: string,
  leavingTime: string,
  originTime: string,
  destinationTime: string,
  destinationTimeWithDelay: string,
): TrainStopStatus => {
  const isOverTheNight = originTime > destinationTime;
  const now = new Date();
  const nowTrainTime =
    convertNumberToTimeFormat(now.getHours()) +
    ':' +
    convertNumberToTimeFormat(now.getMinutes());

  if (
    isOverTheNight &&
    (nowTrainTime > originTime || nowTrainTime < destinationTimeWithDelay)
  ) {
    return getNightTrainStopStatus(
      nowTrainTime,
      arrivingTime,
      leavingTime,
      originTime,
    );
  } else {
    switch (true) {
      case nowTrainTime < arrivingTime || originTime > nowTrainTime:
        return TrainStopStatus.NeedsToArrive;
      case nowTrainTime > leavingTime:
        return TrainStopStatus.HasPassed;
      default:
        return TrainStopStatus.InStation;
    }
  }
};

export const getNightTrainStopStatus = (
  nowTrainTime: string,
  arrivingTime: string,
  leavingTime: string,
  originTime: string,
): TrainStopStatus => {
  if (nowTrainTime < originTime && arrivingTime >= originTime) {
    return TrainStopStatus.HasPassed;
  } else {
    switch (true) {
      case nowTrainTime < arrivingTime:
        return TrainStopStatus.NeedsToArrive;
      case nowTrainTime > leavingTime:
        return TrainStopStatus.HasPassed;
      default:
        return TrainStopStatus.InStation;
    }
  }
};

function convertNumberToTimeFormat(value: number) {
  return value < 10 ? '0' + value : value;
}
