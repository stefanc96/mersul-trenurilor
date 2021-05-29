import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TrainType} from '../../../../interfaces';
import {convertToHoursAndMinutes} from '../../../../utils';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {PropsTrainListItem} from './TrainListItem.interface';
import {ListItem, Text, useTheme} from '@ui-kitten/components';
import {getTrainColorByType} from './TrainListItem.utils';

export const TrainListItem: React.FC<PropsTrainListItem> = props => {
  const {train, onPress} = props;
  const statieOrigine = train.route.stops[0];
  const statieDestinatie = train.route.stops[train.route.stops.length - 1];
  const theme = useTheme();

  const oraP = convertToHoursAndMinutes(statieOrigine.oraP);
  const oraS = convertToHoursAndMinutes(statieDestinatie.oraS);

  const onPressTrain = () => {
    onPress({train, statieOrigine, statieDestinatie});
  };

  const trainColor = getTrainColorByType(train.info.categorieTren as TrainType);

  return (
    <TouchableWithoutFeedback onPress={onPressTrain}>
      <ListItem
        title={`${statieOrigine.denStaOrigine} - ${statieDestinatie.denStaDestinatie}`}
        description={`${oraP} - ${oraS}`}
        accessoryLeft={() => (
          <View
            style={[
              {
                backgroundColor: theme['background-basic-color-2'],
              },
              styles.trainAvatarContainer,
            ]}>
            <Text
              style={[
                {
                  color: trainColor,
                },
                styles.trainLabel,
              ]}>
              {train.info.categorieTren}
            </Text>
          </View>
        )}
      />
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  trainAvatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  trainLabel: {
    fontSize: 20,
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
});
