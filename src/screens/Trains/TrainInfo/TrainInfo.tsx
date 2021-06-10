import React from 'react';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {reduce} from 'lodash';
import {appStyles} from '../../../theme';
import {Station, Stop, Train} from '../../../types';
import {useSelector} from 'react-redux';
import {AppState} from '../../../store';
import {
  Icon,
  Layout,
  List,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {ColorValue, StyleSheet} from 'react-native';
import {RideListItem} from '../../../components';
import {StackActions} from '@react-navigation/native';

const BackIcon = (props: any) => <Icon {...props} name="arrow-back" />;

export const TrainInfo = (props: any) => {
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
  const statieOrigine = stops[0];
  const statieDestinatie = stops[train.route.stops.length - 1];

  const startCoordinates = stations.find(
    station => station.cod === statieOrigine.codStaOrigine,
  )?.coordinates;
  const endCoordinates = stations.find(
    station => station.cod === statieDestinatie.codStaDest,
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

  const onPressBack = () => {
    const {navigation} = props;
    const popAction = StackActions.pop(1);

    navigation.dispatch(popAction);
  };

  const renderBackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={onPressBack} />
  );

  return (
    <Layout style={appStyles.container}>
      <TopNavigation
        alignment="center"
        title={`${statieOrigine.denStaOrigine} - ${statieDestinatie.denStaDestinatie}`}
        subtitle={`${train.info.categorieTren}${train.info.numar}`}
        accessoryLeft={renderBackAction}
      />
      <MapView style={styles.mapView}>
        <MapViewDirections
          origin={{
            latitude: Number(startCoordinates?.lat),
            longitude: Number(startCoordinates?.lon),
          }}
          destination={{
            latitude: Number(endCoordinates?.lat),
            longitude: Number(endCoordinates?.lon),
          }}
          apikey={'AIzaSyDLwnfHcDIgKJSfBIBE77KUWbWHCuWgZ0o'}
          mode={'TRANSIT'}
        />
      </MapView>
      <List data={train.route.stops} renderItem={renderStop} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  mapView: {
    height: '30%',
    width: '100%',
  },
});
