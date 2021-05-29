import {TrainTime, TrainType} from '../../../../types';
import {ColorValue} from 'react-native';
import {TrainRideStatus} from './TrainListItem.interface';

export const getTrainColorByType = (type: TrainType): ColorValue => {
  switch (type) {
    case TrainType.Regio:
      return 'dodgerblue';
    case TrainType.InterRegio:
      return 'crimson';
    case TrainType.RegioExpress:
      return 'darkorange';
    case TrainType.InterCity:
      return 'forestgreen';
    case TrainType.EuroNight:
      return 'cornflowerblue';
    case TrainType.InterRegioNight:
      return 'darkviolet';
    case TrainType.International:
      return 'mediumpurple';
    default:
      return 'aqua';
  }
};

export const getTrainRideColor = (trainRideStatus: TrainRideStatus) => {
  switch (trainRideStatus) {
    case TrainRideStatus.Finished:
      return 'gray';
    case TrainRideStatus.InProgress:
      return 'yellow';
    default:
    case TrainRideStatus.ReadyToStart:
      return 'green';
  }
};

const hasTrainLeft = (hours: number, minutes: number): boolean => {
  const now = new Date();

  if (now.getHours() > hours) {
    return true;
  } else if (now.getHours() === hours && now.getMinutes() > minutes) {
    return true;
  }
  return false;
};

const hasTrainArrived = (
  leavingTime: TrainTime,
  arrivingTime: TrainTime,
): boolean => {
  const now = new Date();

  if (hasTrainLeft(leavingTime.hours, leavingTime.minutes)) {
    if (now.getHours() > arrivingTime.hours) {
      return true;
    } else if (
      now.getHours() === arrivingTime.hours &&
      now.getMinutes() > arrivingTime.minutes
    ) {
      return true;
    }
  }
  return false;
};

export const getTrainRideStatus = (
  leavingTime: TrainTime,
  arrivingTime: TrainTime,
) => {
  switch (true) {
    case hasTrainArrived(leavingTime, arrivingTime):
      return TrainRideStatus.Finished;
    case hasTrainLeft(leavingTime.hours, leavingTime.minutes):
      return TrainRideStatus.InProgress;
    default:
      return TrainRideStatus.ReadyToStart;
  }
};
