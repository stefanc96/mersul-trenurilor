import React, {Ref, useRef} from 'react';
import MapView, {LatLng, Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {head, last, reduce, chain} from 'lodash';
import {appStyles} from '../../../theme';
import {Station, Stop, Train} from '../../../types';
import {useSelector} from 'react-redux';
import {AppState} from '../../../store';
import {
  Layout,
  List,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {ColorValue, StyleSheet, useWindowDimensions} from 'react-native';
import {BackIcon, RideListItem} from '../../../components';
import {StackActions} from '@react-navigation/native';

export const TrainInfo = (props: any) => {
  const {width, height} = useWindowDimensions();
  const mapView: Ref<MapView> = useRef(null);
  const {train, trainColor}: {train: Train; trainColor: ColorValue} =
    props.route.params;

  const stations: Array<Station> = useSelector(
    (state: AppState) => state.timetable.stations,
  );
  let totalKmByStation = 0;
  const stops = train.route.stops;
  const total = reduce(
    stops,
    (sum, stop) => {
      return sum + Number(stop.km);
    },
    0,
  );
  const originStation: Stop = head(stops) as Stop;
  const destinationStation: Stop = last(stops) as Stop;

  const startCoordinates = stations.find(
    station => station.cod === originStation?.codStaOrigine,
  )?.coordinates;
  const endCoordinates = stations.find(
    station => station.cod === destinationStation?.codStaDest,
  )?.coordinates;

  const renderStop = ({item, index}: {item: Stop; index: number}) => {
    if (index === 0) {
      totalKmByStation = 0;
    }
    totalKmByStation += Number(stops[index - 1]?.km || 0) / 1000;

    return (
      <RideListItem
        stop={item}
        index={index}
        trainColor={trainColor}
        previousStop={stops[index - 1]}
        km={totalKmByStation}
      />
    );
  };

  const origin = {
    latitude: Number(startCoordinates?.lat),
    longitude: Number(startCoordinates?.lon),
  };

  const destination = {
    latitude: Number(endCoordinates?.lat),
    longitude: Number(endCoordinates?.lon),
  };

  const onPressBack = () => {
    const {navigation} = props;
    const popAction = StackActions.pop(1);

    navigation.dispatch(popAction);
  };

  const renderBackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={onPressBack} />
  );

  const stationCoordinates = chain(train.route.stops)
    .map(stop => {
      const coordinates = stations.find(
        station => station.cod === stop.codStaOrigine,
      )?.coordinates;
      if (coordinates) {
        return {
          latitude: Number(coordinates?.lat),
          longitude: Number(coordinates?.lon),
        };
      }
    })
    .without(undefined)
    .value();

  return (
    <Layout style={appStyles.container}>
      <TopNavigation
        alignment="center"
        title={`${originStation.denStaOrigine} - ${destinationStation.denStaDestinatie}`}
        subtitle={`${train.info.categorieTren}${train.info.numar}`}
        accessoryLeft={renderBackAction}
      />
      <MapView ref={mapView} style={styles.mapView}>
        {stationCoordinates.map((station, index) => (
          <Marker
            key={index}
            coordinate={station as LatLng}
            pinColor={'green'}
          />
        ))}
        <MapViewDirections
          origin={origin}
          strokeColor={trainColor as string}
          strokeWidth={3}
          destination={destination}
          onReady={result => {
            mapView?.current?.fitToCoordinates?.(result.coordinates, {
              edgePadding: {
                right: width / 20,
                bottom: height / 20,
                left: width / 20,
                top: height / 20,
              },
            });
          }}
          apikey={'AIzaSyDLwnfHcDIgKJSfBIBE77KUWbWHCuWgZ0o'}
          mode={'TRANSIT'}
        />
      </MapView>
      <List
        contentContainerStyle={styles.list}
        data={train.route.stops}
        renderItem={renderStop}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  mapView: {
    height: '30%',
    width: '100%',
  },
  list: {
    paddingVertical: 20,
  },
});
