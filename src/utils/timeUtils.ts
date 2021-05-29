import {TrainTime} from '../types';

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

function convertNumberToTimeFormat(value: number) {
  return value < 10 ? '0' + value : value;
}
