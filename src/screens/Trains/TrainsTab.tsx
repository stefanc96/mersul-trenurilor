import React, {useState} from 'react';
import {ColorValue, StyleSheet, View} from 'react-native';
import {TrainListItem} from './components';
import {ScreenEnum, Train} from '../../types';
import {deburr} from 'lodash';
import {StackActions} from '@react-navigation/native';
import {
  Button,
  Divider,
  Icon,
  Input,
  Layout,
  List,
  Text,
  useTheme,
} from '@ui-kitten/components';
import {appStyles, MEDIUM_SIZE, SMALL_SIZE} from '../../theme';
import {IconPack} from '../../theme/icons/Icon.interface';
import {swapButtonSize} from './TrainsTab.const';
import {strings} from '../../locales';
import {useSelector} from 'react-redux';
import {AppState} from '../../store';
import {filterTrains} from './TrainTab.utils';

export const TrainsTab = ({navigation}: {navigation: any}) => {
  const initialTrains = useSelector(
    (state: AppState) => state.timetable.trains,
  );
  const stationWithTrains = useSelector(
    (state: AppState) => state.timetable.stationWithTrains,
  );
  const [searchFromStation, setSearchFromStation] = useState('');
  const [searchToStation, setSearchToStation] = useState('');
  const theme = useTheme();

  const trains = filterTrains(
    initialTrains,
    stationWithTrains,
    deburr(searchFromStation).toLowerCase(),
    deburr(searchToStation).toLowerCase(),
  );

  const onPressTrain = (train: Train, trainColor: ColorValue) => {
    const pushAction = StackActions.push(ScreenEnum.TrainInfo, {
      train,
      trainColor,
    });

    navigation.dispatch(pushAction);
  };

  const renderTrainListItem = ({item}: {item: Train}) => {
    return <TrainListItem train={item} onPress={onPressTrain} />;
  };

  const onPressSwapStations = () => {
    const newSearchToStation = searchFromStation;
    const newSearchFromStation = searchToStation;

    setSearchToStation(newSearchToStation);
    setSearchFromStation(newSearchFromStation);
  };

  const trainKeyExtractor = (item: Train, index: number) => `${index}`;

  return (
    <Layout style={styles.container}>
      <View>
        <Input
          accessoryLeft={() => (
            <Text style={appStyles.label}>{strings.from}</Text>
          )}
          placeholder={strings.leavingStation}
          value={searchFromStation}
          autoCorrect={false}
          style={{marginBottom: SMALL_SIZE}}
          onChangeText={setSearchFromStation}
        />
        <Input
          accessoryLeft={() => (
            <Text style={appStyles.label}>{strings.to}</Text>
          )}
          autoCorrect={false}
          placeholder={strings.arrivingStation}
          value={searchToStation}
          style={{marginBottom: SMALL_SIZE}}
          onChangeText={setSearchToStation}
        />
        <Button
          onPress={onPressSwapStations}
          accessoryLeft={() => (
            <Icon
              name={'swap-vertical'}
              pack={IconPack.Ion}
              style={[
                {
                  tintColor: theme['border-primary-color-1'],
                },
                styles.swapIcon,
              ]}
            />
          )}
          status={'primary'}
          style={[
            styles.button,
            {
              backgroundColor: theme['background-basic-color-1'],
              borderColor: theme['border-primary-color-1'],
            },
          ]}
        />
      </View>
      <List
        bounces={false}
        data={trains}
        extraData={[searchFromStation, searchToStation]}
        ItemSeparatorComponent={Divider}
        ListEmptyComponent={() => (
          <Text style={styles.emptyLabel}>{strings.noTrain}</Text>
        )}
        renderItem={renderTrainListItem}
        keyExtractor={trainKeyExtractor}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    height: swapButtonSize,
    justifyContent: 'center',
    alignItems: 'center',
    width: swapButtonSize,
    borderRadius: swapButtonSize / 2,
    top: '25%',
    right: 0,
  },
  emptyLabel: {
    textAlign: 'center',
  },
  container: {
    padding: MEDIUM_SIZE,
    flex: 1,
  },
  swapIcon: {
    lineHeight: swapButtonSize / 2,
    fontSize: swapButtonSize / 2,
    textAlign: 'center',
  },
});
