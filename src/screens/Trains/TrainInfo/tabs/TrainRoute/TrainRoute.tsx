import React from 'react';
import {List} from '@ui-kitten/components';
import {Stop} from '../../../../../types';
import {
  convertToHoursAndMinutes,
  getTrainStopStatus,
} from '../../../../../utils';
import {RideListItem} from '../../../../../components';
import {StyleSheet} from 'react-native';
import {PropsTrainRoute} from './TrainRoute.interface';

export const TrainRoute: React.FC<PropsTrainRoute> = ({
  stops,
  originTime,
  destinationTime,
  destinationTimeWithDelay,
  trainColor,
  time,
}) => {
  let totalKmByStation = 0;

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
