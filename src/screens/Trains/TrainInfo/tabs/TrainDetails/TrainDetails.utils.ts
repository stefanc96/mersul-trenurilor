import {
  convertToHoursAndMinutes,
  getDayTimestamp,
  getTrainStopStatus,
} from '../../../../../utils';
import {chain} from 'lodash';
import {Stop, Train, TrainStopStatus} from '../../../../../types';
import {TrainRide} from '../../../../../store';

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
  const currentTrainTime = getDayTimestamp(new Date().toISOString());
  return chain(trainRides)
    .findIndex(trainRide => {
      const trainRideTime = getDayTimestamp(trainRide.timestamp);
      const trainNumber = trainRide.train.info.numar;

      console.log(trainRideTime, currentTrainTime);
      return (
        trainNumber === currentTrain.info.numar &&
        trainRideTime === currentTrainTime
      );
    })
    .value();
};
