import React from 'react';
import {appStyles} from '../../../theme';
import {
  Divider,
  Icon,
  Layout,
  List,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {StackActions} from '@react-navigation/native';
import {ScreenEnum, Station, Train} from '../../../types';
import MapView, {Marker} from 'react-native-maps';
import {ColorValue, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {AppState} from '../../../store';
import {find, chain} from 'lodash';
import {strings} from '../../../locales';
import {TrainListItem} from '../../Trains/components';

const BackIcon = (props: any) => <Icon {...props} name="arrow-back" />;

export const StationInfo = (props: any) => {
  const {navigation} = props;
  const {station, trainIds}: {station: Station; trainIds: string[]} =
    props.route.params;
  const initialTrains = useSelector(
    (state: AppState) => state.timetable.trains,
  );

  const onPressBack = () => {
    const popAction = StackActions.pop(1);

    navigation.dispatch(popAction);
  };

  const renderBackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={onPressBack} />
  );

  const trains = chain(trainIds)
    .map(trainId => {
      return find(initialTrains, train => train.info.numar === trainId);
    })
    .value();

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
  const trainKeyExtractor = (item: Train, index: number) => `${index}`;

  return (
    <Layout style={appStyles.container}>
      <TopNavigation
        alignment="center"
        accessoryLeft={renderBackAction}
        title={station.name}
      />
      <MapView
        style={styles.mapView}
        initialCamera={{
          altitude: 1000,
          heading: 1,
          pitch: 1,
          zoom: 1,
          center: {
            latitude: Number(station.coordinates.lat),
            longitude: Number(station.coordinates.lon),
          },
        }}>
        <Marker
          coordinate={{
            latitude: Number(station.coordinates.lat),
            longitude: Number(station.coordinates.lon),
          }}
        />
      </MapView>
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
  mapView: {
    height: '30%',
    width: '100%',
  },
  emptyLabel: {
    textAlign: 'center',
  },
});
