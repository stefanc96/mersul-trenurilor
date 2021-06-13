import {Stop, TrainStopStatus, TrainTime} from '../types';

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

export function getTrainTimeDifference(
  startTimeStamp: string,
  endTimeStamp: string,
): TrainTime {
  const startTime = getHoursAndMinutes(startTimeStamp);
  const endTime = getHoursAndMinutes(endTimeStamp);

  if (endTime.hours < startTime.hours) {
    let totalMinutes = endTime.minutes + startTime.minutes;
    let totalHours = 23 - startTime.hours + endTime.hours;

    if (totalMinutes >= 60) {
      totalHours += 1;
      totalMinutes -= 60;
    }

    return {
      minutes: totalMinutes,
      hours: totalHours,
    };
  }
  let totalMinutes = endTime.minutes + startTime.minutes;
  let totalHours = endTime.hours - startTime.hours;

  if (totalMinutes >= 60) {
    totalHours += 1;
    totalMinutes -= 60;
  }

  return {
    minutes: totalMinutes,
    hours: totalHours,
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
      destinationTimeWithDelay,
    );
  } else {
    return getStatus(nowTrainTime, arrivingTime, leavingTime);
  }
};

const getStatus = (
  nowTrainTime: string,
  arrivingTime: string,
  leavingTime: string,
) => {
  switch (true) {
    case nowTrainTime < arrivingTime:
      return TrainStopStatus.NeedsToArrive;
    case nowTrainTime > leavingTime:
      return TrainStopStatus.HasPassed;
    default:
      return TrainStopStatus.InStation;
  }
};

export const getNightTrainStopStatus = (
  nowTrainTime: string,
  arrivingTime: string,
  leavingTime: string,
  originTime: string,
  destinationTime: string,
): TrainStopStatus => {
  if (arrivingTime >= originTime && arrivingTime <= '24:00') {
    if (nowTrainTime < originTime) {
      return TrainStopStatus.HasPassed;
    }
  } else {
    if (nowTrainTime > destinationTime) {
      return TrainStopStatus.NeedsToArrive;
    }
  }
  return getStatus(nowTrainTime, arrivingTime, leavingTime);
};

function convertNumberToTimeFormat(value: number) {
  return value < 10 ? '0' + value : value;
}

export const getArriveDate = (
  stop: Stop,
  originTime: string,
  destinationTime: string,
) => {
  const now = new Date();
  const stopTime = getHoursAndMinutes(stop.oraS);
  const isOverTheNight = originTime > destinationTime;
  now.setHours(stopTime.hours);
  now.setMinutes(stopTime.minutes);
  if (isOverTheNight) {
    now.setDate(now.getDate() + 1);
  }
  return now;
};
