import {Station, Stop} from '../../../types';
import {LatLng} from 'react-native-maps';
import {
  convertToHoursAndMinutes,
  getNowTrainTime,
  getNowTrainTimeInSeconds,
} from '../../../utils';
const dayInSeconds = 24 * 3600;

export const getTrainCurrentCoordinates = (
  currentStop: Stop,
  nextStop: Stop,
  lastStation: Station,
  nextStation: Station,
): LatLng | undefined => {
  const nowTrainTime = getNowTrainTime();
  const currentStopLeaveTime = convertToHoursAndMinutes(currentStop.oraP);
  const currentStopArriveTime = convertToHoursAndMinutes(currentStop.oraS);

  const nextStopLeaveTime = nextStop
    ? convertToHoursAndMinutes(nextStop.oraP)
    : '';
  if (
    (nowTrainTime <= currentStopArriveTime && !lastStation) ||
    (nowTrainTime >= currentStopArriveTime &&
      nowTrainTime <= nextStopLeaveTime &&
      nextStop) ||
    currentStopArriveTime > nextStopLeaveTime
  ) {
    return {
      latitude: Number(nextStation.coordinates.lat),
      longitude: Number(nextStation.coordinates.lon),
    };
  }

  if (
    nowTrainTime > currentStopLeaveTime &&
    nowTrainTime < currentStopArriveTime
  ) {
    let totalTime = Number(currentStop.oraS) - Number(currentStop.oraP);

    let timePassed =
      Number(getNowTrainTimeInSeconds()) - Number(currentStop.oraP);

    let percentage = (timePassed * 100) / totalTime;

    return getCoordinatesForTrain(percentage, lastStation, nextStation);
  }

  if (
    nowTrainTime < currentStopLeaveTime &&
    nowTrainTime > currentStopArriveTime
  ) {
    let totalTime =
      dayInSeconds - (Number(currentStop.oraS) - Number(currentStop.oraP));
    const nowTimeInSeconds = getNowTrainTimeInSeconds();
    let timePassed;
    if (nowTimeInSeconds < dayInSeconds) {
      timePassed = nowTimeInSeconds - Number(currentStop.oraP);
    } else {
      timePassed =
        dayInSeconds -
        Number(currentStop.oraP) +
        (Number(currentStop.oraS) - nowTimeInSeconds);
    }

    let percentage = (timePassed * 100) / totalTime;

    return getCoordinatesForTrain(percentage, lastStation, nextStation);
  }
};

const getCoordinatesForTrain = (
  percentage: number,
  lastStation: Station,
  nextStation: Station,
) => {
  const x1 = Number(lastStation.coordinates.lat);
  const x2 = Number(nextStation.coordinates.lat);
  const y1 = Number(lastStation.coordinates.lon);
  const y2 = Number(nextStation.coordinates.lon);
  const k = percentage;

  const latitude = (x1 + k * x2) / (1 + k);
  const longitude = (y1 + k * y2) / (1 + k);

  return {
    latitude,
    longitude,
  };
};
