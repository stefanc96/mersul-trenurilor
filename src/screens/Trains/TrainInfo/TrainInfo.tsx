import React from 'react';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {appStyles} from '../../../theme';
import {Station, Stop, Train} from '../../../types';
import {useSelector} from 'react-redux';
import {AppState} from '../../../store';
import {Layout, List, ListItem} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';

export const TrainInfo = (props: any) => {
  const {train}: {train: Train} = props.route.params;
  const stations: Array<Station> = useSelector(
    (state: AppState) => state.timetable.stations,
  );
  const statieOrigine = train.route.stops[0];
  const statieDestinatie = train.route.stops[train.route.stops.length - 1];

  const startCoordinates = stations.find(
    station => station.cod === statieOrigine.codStaOrigine,
  )?.coordinates;
  const endCoordinates = stations.find(
    station => station.cod === statieDestinatie.codStaDest,
  )?.coordinates;

  const renderStop = ({item}: {item: Stop; index: number}) => {
    return <ListItem title={item.denStaOrigine} />;
  };

  return (
    <Layout style={appStyles.container}>
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
