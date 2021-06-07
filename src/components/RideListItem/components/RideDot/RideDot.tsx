import {View} from 'react-native';
import React from 'react';
import {rideDotSize, smallRideDotSize} from './RideDot.const';
import {RideDotProps} from './RideDot.interface';
import {TrainStopStatus} from '../../../../types';
import {useTheme} from '@ui-kitten/components';

export const RideDot: React.FC<RideDotProps> = ({
  trainColor,
  rideStopStatus,
}) => {
  const theme = useTheme();
  return (
    <View
      style={{
        height: rideDotSize,
        width: rideDotSize,
        borderColor: trainColor,
        borderWidth: 1,
        backgroundColor:
          rideStopStatus === TrainStopStatus.HasPassed
            ? trainColor
            : theme['background-basic-color-1'],
        borderRadius: rideDotSize / 2,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {rideStopStatus === TrainStopStatus.InStation && (
        <View
          style={{
            height: smallRideDotSize,
            width: smallRideDotSize,
            backgroundColor: trainColor,
            borderRadius: smallRideDotSize / 2,
          }}
        />
      )}
    </View>
  );
};
