import React from 'react';
import {Text, View} from 'react-native';
import {Row} from '../Row';
import {RideDot} from './components';
import {RideListItemProps} from './RideListItem.interface';
import {getTrainStopStatus} from '../../utils';

export const RideListItem: React.FC<RideListItemProps> = ({
  trainColor,
  stop,
  index,
}) => {
  const rideStopStatus = getTrainStopStatus(stop.oraS, stop.oraP);
  return (
    <Row>
      <View>
        {index !== 0 && (
          <View
            style={{
              height: 40,
              width: 10,
              backgroundColor: trainColor,
              alignSelf: 'center',
            }}
          />
        )}
        <RideDot trainColor={trainColor} rideStopStatus={rideStopStatus} />
      </View>
      <Row style={{marginTop: index !== 0 ? 40 : 0, alignItems: 'center'}}>
        <Text>{stop.denStaOrigine}</Text>
      </Row>
    </Row>
  );
};
