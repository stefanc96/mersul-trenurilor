import {Station, Stop} from '../../../types';
import {LatLng} from 'react-native-maps';
import {
  convertToHoursAndMinutes,
  getHoursAndMinutes,
  getNowTrainTime,
} from '../../../utils';

export const getTrainCurrentCoordinates = (
  stop: Stop,
  lastStation: Station,
  nextStation: Station,
): LatLng => {
  if (stop) {
    return {
      latitude: Number(nextStation.coordinates.lat),
      longitude: Number(nextStation.coordinates.lon),
    };
  }
  const nowTrainTime = getNowTrainTime();
  const leaveTrainTime = convertToHoursAndMinutes(stop.oraP);
  const arriveTrainTime = convertToHoursAndMinutes(stop.oraS);
  const now = new Date();

  if (
    leaveTrainTime < arriveTrainTime &&
    nowTrainTime < arriveTrainTime &&
    nowTrainTime > leaveTrainTime
  ) {
    const nextStationTimeInSeconds = getHoursAndMinutes(stop.oraS);
    const timeInSeconds =
      nextStationTimeInSeconds.minutes * 60 +
      nextStationTimeInSeconds.hours * 3600;
    const nowInSeconds = now.getMinutes() * 60 + now.getHours() * 3600;

    const percentage = (nowInSeconds * 100) / timeInSeconds;

    const x1 = Number(lastStation.coordinates.lat);
    const y1 = Number(lastStation.coordinates.lon);
    const x2 = Number(nextStation.coordinates.lat);
    const y2 = Number(nextStation.coordinates.lon);

    return {
      latitude: (x1 + percentage * x2) / (1 + percentage),
      longitude: (y1 + percentage * y2) / (1 + percentage),
    };
  }
};
