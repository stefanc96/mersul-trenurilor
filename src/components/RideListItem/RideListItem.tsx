import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Row} from '../Row';
import {RideDot} from './components';
import {RideListItemProps} from './RideListItem.interface';
import {convertToHoursAndMinutes, getTrainStopStatus} from '../../utils';
import {useTheme} from '@ui-kitten/components';

export const RideListItem: React.FC<RideListItemProps> = ({
  trainColor,
  stop,
  index,
  previousStop,
  km,
}) => {
  const theme = useTheme();
  const rideStopStatus = getTrainStopStatus(stop.oraS, stop.oraP);
  const arrivalTime = convertToHoursAndMinutes(previousStop?.oraP || stop.oraS);
  const leavingTime = convertToHoursAndMinutes(stop.oraP);
  return (
    <View>
      {index !== 0 && (
        <View
          style={[
            {
              backgroundColor: trainColor,
            },
            styles.stationSeparator,
          ]}
        />
      )}
      <Row>
        <View style={styles.kmColumn}>
          <Text style={{color: theme['text-basic-color']}}>
            {km.toFixed(1)}
          </Text>
        </View>
        <View style={styles.rideDot}>
          <RideDot trainColor={trainColor} rideStopStatus={rideStopStatus} />
        </View>
        <View style={styles.arrivalTimeColumn}>
          <Text style={{color: theme['text-basic-color']}}>{arrivalTime}</Text>
        </View>
        <View style={styles.stationNameColumn}>
          <Text
            style={[
              {color: theme['text-basic-color']},
              styles.stationNameText,
            ]}>
            {stop.denStaOrigine}
          </Text>
        </View>
        <View style={styles.leavingTimeColumn}>
          <Text style={{color: theme['text-basic-color']}}>{leavingTime}</Text>
        </View>
      </Row>
    </View>
  );
};

const styles = StyleSheet.create({
  stationSeparator: {
    width: 10,
    marginLeft: '15%',
    marginRight: '75%',
    height: 40,
    alignSelf: 'center',
  },
  kmColumn: {
    width: '15%',
    alignItems: 'center',
  },
  rideDot: {
    width: '10%',
    alignItems: 'center',
  },
  arrivalTimeColumn: {
    width: '12%',
    alignItems: 'center',
  },
  stationNameColumn: {
    width: '46%',
    alignItems: 'center',
  },
  stationNameText: {
    textAlign: 'center',
  },
  leavingTimeColumn: {
    width: '12%',
    alignItems: 'center',
  },
});
