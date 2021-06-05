import {Train} from '../../types';
import {chain, deburr, intersection, keys, words, last, head} from 'lodash';

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
  searchedStation: string,
) => {
  return chain(stationWithTrains)
    .keys()
    .filter(stationName => {
      return isSearchedStationInStationName(stationName, searchedStation);
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
      trainIds = chain(
        getTrainsByStation(initialTrains, stationWithTrains, fromStation),
      )
        .filter(trainId => {
          const lastStationName =
            last(initialTrains[trainId]?.route?.stops)?.denStaOrigine || '';
          return !isSearchedStationInStationName(lastStationName, fromStation);
        })
        .value();
      break;
    case !fromStation.length && !!toStation.length:
      trainIds = chain(
        getTrainsByStation(initialTrains, stationWithTrains, toStation),
      )
        .filter(trainId => {
          const firstStationName =
            head(initialTrains[trainId]?.route?.stops)?.denStaOrigine || '';
          return !isSearchedStationInStationName(firstStationName, toStation);
        })
        .value();
      break;
    case !!fromStation.length && !!toStation.length:
      const departureTrainIds = chain(
        getTrainsByStation(initialTrains, stationWithTrains, fromStation),
      )
        .filter(trainId => {
          const lastStationName =
            last(initialTrains[trainId]?.route?.stops)?.denStaOrigine || '';
          return !isSearchedStationInStationName(lastStationName, fromStation);
        })
        .value();
      const arrivalTrainIds = chain(
        getTrainsByStation(initialTrains, stationWithTrains, toStation),
      )
        .filter(trainId => {
          const firstStationName =
            head(initialTrains[trainId]?.route?.stops)?.denStaOrigine || '';
          return !isSearchedStationInStationName(firstStationName, toStation);
        })
        .value();

      trainIds = intersection(departureTrainIds, arrivalTrainIds);
      break;
    default:
    case !fromStation.length && !toStation.length:
      trainIds = keys(initialTrains);
  }
  return chain(trainIds)
    .map(trainId => initialTrains[trainId])
    .orderBy('route.stops[0].oraP')
    .value();
};

const isSearchedStationInStationName = (
  stationName: string,
  searchedStation: string,
): boolean => {
  const processedName = deburr(stationName.toLowerCase());
  return (
    words(processedName).includes(searchedStation) ||
    processedName === searchedStation
  );
};
