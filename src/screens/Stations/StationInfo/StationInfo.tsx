import React, {Ref, useRef} from 'react';
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
import MapView, {LatLng, Marker} from 'react-native-maps';
import {
  ColorValue,
  Platform,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import {useSelector} from 'react-redux';
import {AppState} from '../../../store';
import {find, chain} from 'lodash';
import {strings} from '../../../locales';
import {TrainListItem} from '../../Trains/components';
import {IconPack} from '../../../theme/icons/Icon.interface';

const StationIcon = (props: any) => (
  <Icon {...props} pack={IconPack.MaterialCommunity} name="map-marker" />
);

const BackIcon = (props: any) => <Icon {...props} name="arrow-back" />;

export const StationInfo = (props: any) => {
  const {navigation} = props;
  const mapView: Ref<MapView> = useRef(null);
  const {station, trainIds}: {station: Station; trainIds: string[]} =
    props.route.params;
  const initialTrains = useSelector(
    (state: AppState) => state.timetable.trains,
  );
  const {width, height} = useWindowDimensions();

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

  const stationCoordinates = {
    latitude: Number(station.coordinates.lat),
    longitude: Number(station.coordinates.lon),
  };

  const mapProps =
    Platform.OS === 'android'
      ? {
          onMapReady: () => {
            mapView?.current?.fitToCoordinates?.(
              [stationCoordinates] as LatLng[],
              {
                edgePadding: {
                  right: width / 20,
                  bottom: height / 20,
                  left: width / 20,
                  top: height / 20,
                },
              },
            );
          },
          region: {
            ...stationCoordinates,
            latitudeDelta: 0.01,
            longitudeDelta: 0.0421,
          },
        }
      : null;

  return (
    <Layout style={appStyles.container}>
      <TopNavigation
        alignment="center"
        accessoryLeft={renderBackAction}
        title={station.name}
      />
      <MapView
        style={styles.mapView}
        ref={mapView}
        zoomEnabled={false}
        {...mapProps}
        initialCamera={{
          altitude: 1000,
          heading: 1,
          pitch: 1,
          zoom: 1,
          center: stationCoordinates,
        }}>
        <Marker coordinate={stationCoordinates}>
          <StationIcon style={styles.stationIcon} />
        </Marker>
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
  stationIcon: {
    height: 30,
    color: 'black',
    bottom: Platform.OS === 'android' ? 0 : 10,
  },
});
