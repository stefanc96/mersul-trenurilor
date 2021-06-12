import React, {useEffect, useState} from 'react';
import {List} from '@ui-kitten/components';
import {Stop} from '../../../../../types';
import {
  convertToHoursAndMinutes,
  convertToHoursAndMinutesWidthDelay,
  getTrainStopStatus,
} from '../../../../../utils';
import {RideListItem} from '../../../../../components';
import {StyleSheet} from 'react-native';
import {PropsTrainRoute} from './TrainRoute.interface';

const TIME_TO_UPDATE = 5 * 1000;

export const TrainRoute: React.FC<PropsTrainRoute> = ({
  stops,
  originStation,
  destinationStation,
  trainColor,
}) => {
  const [time, setTime] = useState(0);
  let totalKmByStation = 0;

  const originTime = convertToHoursAndMinutes(originStation.oraS);
  const destinationTime = convertToHoursAndMinutes(destinationStation.oraP);
  const destinationTimeWithDelay = convertToHoursAndMinutesWidthDelay(
    destinationStation.oraP,
    1,
  );

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, TIME_TO_UPDATE);

    return () => {
      clearInterval(timeInterval);
    };
  }, []);

  const renderStop = ({item, index}: {item: Stop; index: number}) => {
    if (index === 0) {
      totalKmByStation = 0;
    }
    totalKmByStation += Number(stops[index - 1]?.km || 0) / 1000;
    const previousStop = stops[index - 1];
    const arrivalTime = convertToHoursAndMinutes(
      previousStop?.oraS || item.oraS,
    );
    const leavingTime = convertToHoursAndMinutes(item.oraP);
    const rideStopStatus = getTrainStopStatus(
      arrivalTime,
      leavingTime,
      originTime,
      destinationTime,
      destinationTimeWithDelay,
    );

    return (
      <RideListItem
        stop={item}
        index={index}
        trainColor={trainColor}
        arrivalTime={arrivalTime}
        leavingTime={leavingTime}
        rideStopStatus={rideStopStatus}
        km={totalKmByStation}
      />
    );
  };

  return (
    <List
      contentContainerStyle={styles.list}
      data={stops}
      renderItem={renderStop}
      extraData={[time]}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    paddingVertical: 20,
  },
});
