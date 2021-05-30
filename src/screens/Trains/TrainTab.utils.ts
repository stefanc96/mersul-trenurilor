import {Train} from '../../types';
import {chain, deburr, intersection, keys, words} from 'lodash';

export const compareTrain = (trainFirst: Train, trainSecond: Train) => {
  if (trainFirst.route.stops[0].oraP > trainSecond.route.stops[0].oraP) {
    return 1;
  } else if (trainFirst.route.stops[0].oraP < trainSecond.route.stops[0].oraP) {
    return -1;
  }
  return 0;
};

const getTrainsByStation = (
  initialTrains: {[p: string]: Train},
  stationWithTrains: {[key: string]: Array<string>},
  station: string,
) => {
  return chain(stationWithTrains)
    .keys()
    .filter(stationName => {
      const processedName = deburr(stationName.toLowerCase());
      return (
        words(processedName).includes(station) || processedName === station
      );
    })
    .map(stationName => stationWithTrains[stationName])
    .concat()
    .flatten()
    .value();
};

export const filterTrains = (
  initialTrains: {[p: string]: Train},
  stationWithTrains: {[key: string]: Array<string>},
  fromStation: string,
  toStation: string,
): Train[] => {
  let trainIds: string[] = [];
  switch (true) {
    case !!fromStation.length && !toStation.length:
      trainIds = getTrainsByStation(
        initialTrains,
        stationWithTrains,
        fromStation,
      );
      break;
    case !fromStation.length && !!toStation.length:
      trainIds = getTrainsByStation(
        initialTrains,
        stationWithTrains,
        toStation,
      );
      break;
    case !!fromStation.length && !!toStation.length:
      const departureTrainIds = getTrainsByStation(
        initialTrains,
        stationWithTrains,
        fromStation,
      );
      const arrivalTrainIds = getTrainsByStation(
        initialTrains,
        stationWithTrains,
        toStation,
      );

      trainIds = intersection(departureTrainIds, arrivalTrainIds);
      break;
    default:
    case !fromStation.length && !toStation.length:
      trainIds = keys(initialTrains);
  }
  return chain(trainIds)
    .map(trainId => initialTrains[trainId])
    .value();
};
