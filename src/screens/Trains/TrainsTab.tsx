import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {TrainListItem} from './components';
import {ScreenEnum, Station, Stop, Train} from '../../types';
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

const mersulTrenurilor = require('../../../mersul-trenurilor.json');
const stations: Station[] = mersulTrenurilor.cfr.stations;

const compareTrain = (trainFirst: Train, trainSecond: Train) => {
  if (trainFirst.route.stops[0].oraP > trainSecond.route.stops[0].oraP) {
    return 1;
  } else if (trainFirst.route.stops[0].oraP < trainSecond.route.stops[0].oraP) {
    return -1;
  }
  return 0;
};
const initialTrains: Train[] = mersulTrenurilor.cfr.trains;

const processStationName = (stationName: string): string => {
  return deburr(stationName).toLowerCase();
};

export const TrainsTab = ({navigation}: {navigation: any}) => {
  const [trains, setTrains] = useState(initialTrains.sort(compareTrain));
  const [searchFromStation, setSearchFromStation] = useState('');
  const [searchToStation, setSearchToStation] = useState('');
  const theme = useTheme();

  useEffect(() => {
    const fromStation = processStationName(searchFromStation);

    const searchedTrains = initialTrains.filter(train => {
      const leavingStationName = processStationName(
        train.route.stops[0].denStaOrigine,
      );

      if (searchToStation) {
        const destinationStationName = processStationName(
          train.route.stops[train.route.stops.length - 1].denStaDestinatie,
        );
        const searchToStationProcessed = processStationName(searchToStation);
        if (
          leavingStationName.includes(fromStation) &&
          destinationStationName.includes(searchToStationProcessed)
        ) {
          return train;
        }
      } else {
        if (leavingStationName.includes(fromStation)) {
          return train;
        }
      }
    });
    setTrains(searchedTrains.sort(compareTrain));
  }, [searchFromStation, searchToStation]);

  useEffect(() => {
    const toStation = processStationName(searchToStation);
    const searchedTrains = initialTrains.filter(train => {
      const destinationStationName = processStationName(
        train.route.stops[train.route.stops.length - 1].denStaDestinatie,
      );

      if (searchFromStation) {
        const leavingStationName = processStationName(
          train.route.stops[0].denStaOrigine,
        );
        const searchFromStationProcessed =
          processStationName(searchFromStation);

        if (
          leavingStationName.includes(searchFromStationProcessed) &&
          destinationStationName.includes(toStation)
        ) {
          return train;
        }
      } else {
        if (destinationStationName.includes(toStation)) {
          return train;
        }
      }
    });
    setTrains(searchedTrains.sort(compareTrain));
  }, [searchToStation, searchFromStation]);

  const onPressTrain = (info: any) => {
    const {
      statieOrigine,
      statieDestinatie,
    }: {statieOrigine: Stop; statieDestinatie: Stop} = info;
    const startCoordinates = stations.find(
      station => station.cod === statieOrigine.codStaOrigine,
    )?.coordinates;
    const endCoordinates = stations.find(
      station => station.cod === statieDestinatie.codStaDest,
    )?.coordinates;

    const pushAction = StackActions.push(ScreenEnum.TrainInfo, {
      coordinates: [startCoordinates, endCoordinates],
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

  const trainKeyExtractor = (item: Train, index: number) =>
    `${item.info.numar} - ${index}`;

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
