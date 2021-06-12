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
  const nowTrainTime =
    convertNumberToTimeFormat(now.getHours()) +
    ':' +
    convertNumberToTimeFormat(now.getMinutes());
  switch (true) {
    case nowTrainTime < arrivingTime:
      return TrainStopStatus.NeedsToArrive;
    case nowTrainTime > leavingTime:
      return TrainStopStatus.HasPassed;
    default:
      return TrainStopStatus.InStation;
  }
};

function convertNumberToTimeFormat(value: number) {
  return value < 10 ? '0' + value : value;
}
