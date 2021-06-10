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
          style={{
            width: 10,
            marginLeft: '15%',
            marginRight: '75%',
            height: 40,
            alignSelf: 'center',
            backgroundColor: trainColor,
          }}
        />
      )}
      <Row style={{alignItems: 'center'}}>
        <View
          style={{
            width: '15%',
            alignItems: 'center',
          }}>
          <Text style={{color: theme['text-basic-color']}}>
            {parseFloat(km).toFixed(1)}
          </Text>
        </View>
        <View style={{width: '10%', alignItems: 'center'}}>
          <RideDot trainColor={trainColor} rideStopStatus={rideStopStatus} />
        </View>
        <View style={{width: '12%', alignItems: 'center'}}>
          <Text style={{color: theme['text-basic-color']}}>{arrivalTime}</Text>
        </View>
        <View style={{width: '46%', alignItems: 'center'}}>
          <Text style={{color: theme['text-basic-color'], textAlign: 'center'}}>
            {stop.denStaOrigine}
          </Text>
        </View>
        <View style={{width: '12%', alignItems: 'center'}}>
          <Text style={{color: theme['text-basic-color']}}>{leavingTime}</Text>
        </View>
      </Row>
    </View>
  );
};

const styles = StyleSheet.create({});
