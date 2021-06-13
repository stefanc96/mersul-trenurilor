import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon, Text} from '@ui-kitten/components';
import {PropsTrainServiceItem} from './TrainServiceItem.interface';
import {TrainService} from '../../types';
import {IconPack} from '../../theme/icons/Icon.interface';
import {strings} from '../../locales';

export const SingleBedIcon = (props: any) => (
  <Icon {...props} pack={IconPack.MaterialCommunity} name="bed" />
);

export const DoubleBedIcon = (props: any) => (
  <Icon {...props} pack={IconPack.MaterialCommunity} name="bunk-bed" />
);

export const BistroIcon = (props: any) => (
  <Icon {...props} pack={IconPack.Ion} name="restaurant" />
);

const LABELS = {
  [TrainService.First]: strings.firstClass,
  [TrainService.Second]: strings.secondClass,
  [TrainService.SleepingCabin6]: `${strings.sleepingCabin} 6`,
  [TrainService.SleepingCabin4]: `${strings.sleepingCabin} 4`,
  [TrainService.SleepingCabin2]: `${strings.bed} 2`,
  [TrainService.SleepingCabin1]: `${strings.bed} 1`,
  [TrainService.Bistro]: `${strings.bistro}`,
};

const ICON_SIZE = 30;
export const TrainServiceItem: React.FC<PropsTrainServiceItem> = ({
  trainService,
}) => {
  const renderIcon = () => {
    switch (trainService) {
      case TrainService.First:
      case TrainService.Second:
        return (
          <View
            style={[
              {
                backgroundColor:
                  trainService === TrainService.First ? 'red' : 'blue',
              },
              styles.firstClassContainer,
            ]}>
            <Text category={'h5'}>
              {trainService === TrainService.First ? 1 : 2}
            </Text>
          </View>
        );
      case TrainService.Bistro:
        return <BistroIcon style={{height: ICON_SIZE, color: 'coral'}} />;
      case TrainService.SleepingCabin2:
      case TrainService.SleepingCabin1:
        return (
          <SingleBedIcon style={{height: ICON_SIZE, color: 'lightskyblue'}} />
        );
      case TrainService.SleepingCabin4:
      case TrainService.SleepingCabin6:
        return (
          <DoubleBedIcon style={{height: ICON_SIZE, color: 'darkviolet'}} />
        );
    }
  };

  return (
    <View style={styles.container}>
      {renderIcon()}
      <Text>{LABELS[trainService]}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 5,
    justifyContent: 'space-between',
    height: 60,
    marginTop: 20,
  },
  firstClassContainer: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: 5,
    justifyContent: 'center',
    marginBottom: 5,
    alignItems: 'center',
  },
});
