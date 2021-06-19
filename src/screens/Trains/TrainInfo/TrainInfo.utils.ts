import {Station, Stop} from '../../../types';
import {LatLng} from 'react-native-maps';
import {
  convertToHoursAndMinutes,
  getNowTrainTime,
  getNowTrainTimeInSeconds,
} from '../../../utils';
const dayInSeconds = 24 * 3600;

export const getTrainCurrentCoordinates = (
  stop: Stop,
  lastStation: Station,
  nextStation: Station,
): LatLng | undefined => {
  const nowTrainTime = getNowTrainTime();
  const leaveTrainTime = convertToHoursAndMinutes(stop.oraP);
  const arriveTrainTime = convertToHoursAndMinutes(stop.oraS);

  if (nowTrainTime > leaveTrainTime && nowTrainTime < arriveTrainTime) {
    let totalTime = Number(stop.oraS) - Number(stop.oraP);

    let timePassed = Number(getNowTrainTimeInSeconds()) - Number(stop.oraP);

    let percentage = (timePassed * 100) / totalTime;

    return getCoordinatesForTrain(percentage, lastStation, nextStation);
  }

  if (nowTrainTime < leaveTrainTime && nowTrainTime > arriveTrainTime) {
    let totalTime = dayInSeconds - (Number(stop.oraS) - Number(stop.oraP));
    const nowTimeInSeconds = getNowTrainTimeInSeconds();
    let timePassed;
    if (nowTimeInSeconds < dayInSeconds) {
      timePassed = nowTimeInSeconds - Number(stop.oraP);
    } else {
      timePassed =
        dayInSeconds -
        Number(stop.oraP) +
        (Number(stop.oraS) - nowTimeInSeconds);
    }

    let percentage = (timePassed * 100) / totalTime;

    return getCoordinatesForTrain(percentage, lastStation, nextStation);
  }
  if (nowTrainTime <= leaveTrainTime && !lastStation) {
    return {
      latitude: Number(nextStation.coordinates.lat),
      longitude: Number(nextStation.coordinates.lon),
    };
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
