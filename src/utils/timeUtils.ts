import {TrainStopStatus, TrainTime} from '../types';

export function convertToHoursAndMinutes(value: string) {
  const {hours, minutes} = getHoursAndMinutes(value);

  return (
    convertNumberToTimeFormat(hours) + ':' + convertNumberToTimeFormat(minutes)
  );
}

export function getHoursAndMinutes(value: string): TrainTime {
  const sec = parseInt(value, 10);
  let hours = Math.floor(sec / 3600);
  let minutes = Math.floor((sec - hours * 3600) / 60);

  return {
    hours,
    minutes,
  };
}

export const getTrainStopStatus = (
  arrivingTime: string,
  leavingTime: string,
): TrainStopStatus => {
  const now = new Date();
  const nowTrainTime: TrainTime = {
    minutes: now.getMinutes(),
    hours: now.getHours(),
  };
  const arrivingTimeDetails = getHoursAndMinutes(arrivingTime);
  const leavingTimeDetails = getHoursAndMinutes(leavingTime);
  const arrivingStatusComparedWithNow = compareTrainTimes(
    nowTrainTime,
    arrivingTimeDetails,
  );
  const leavingStatusComparedWithNow = compareTrainTimes(
    nowTrainTime,
    leavingTimeDetails,
  );

  switch (true) {
    case arrivingStatusComparedWithNow === -1:
      return TrainStopStatus.NeedsToArrive;
    case arrivingStatusComparedWithNow <= 0 &&
      leavingStatusComparedWithNow === -1:
      return TrainStopStatus.InStation;
    default:
      return TrainStopStatus.HasPassed;
  }
};

const compareTrainTimes = (time1: TrainTime, time2: TrainTime): number => {
  switch (true) {
    case time1.hours > time2.hours:
      return 1;
    case time1.hours < time2.hours:
      return -1;
    default:
      switch (true) {
        case time1.minutes > time2.minutes:
          return 1;
        case time1.minutes < time2.minutes:
          return -1;
        default:
          return 0;
      }
  }
};

function convertNumberToTimeFormat(value: number) {
  return value < 10 ? '0' + value : value;
}
