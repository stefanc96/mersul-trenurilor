import React, {Ref, useEffect, useRef, useState} from 'react';
import MapView, {LatLng, Marker, Polyline} from 'react-native-maps';
import {chain, head, last} from 'lodash';
import {appStyles} from '../../../theme';
import {Station, Stop, Train} from '../../../types';
import {useSelector} from 'react-redux';
import {AppState} from '../../../store';
import {
  Layout,
  Tab,
  TabView,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {ColorValue, StyleSheet, useWindowDimensions} from 'react-native';
import {BackIcon} from '../../../components';
import {StackActions} from '@react-navigation/native';
import {TrainDetails, TrainRoute} from './tabs';
import {strings} from '../../../locales';
import {
  convertToHoursAndMinutes,
  convertToHoursAndMinutesWidthDelay,
} from '../../../utils';

const TIME_TO_UPDATE = 10 * 1000;

export const TrainInfo = (props: any) => {
  const {train, trainColor}: {train: Train; trainColor: ColorValue} =
    props.route.params;
  const {width, height} = useWindowDimensions();
  const mapView: Ref<MapView> = useRef(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const stations: Array<Station> = useSelector(
    (state: AppState) => state.timetable.stations,
  );
  const stops = train.route.stops;
  const originStation: Stop = head(stops) as Stop;
  const destinationStation: Stop = last(stops) as Stop;
  const originTime = convertToHoursAndMinutes(originStation.oraS);
  const destinationTime = convertToHoursAndMinutes(destinationStation.oraP);
  const destinationTimeWithDelay = convertToHoursAndMinutesWidthDelay(
    destinationStation.oraP,
    1,
  );
  const [time, setTime] = useState(0);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, TIME_TO_UPDATE);

    return () => {
      clearInterval(timeInterval);
    };
  }, []);

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
      <MapView
        ref={mapView}
        style={styles.mapView}
        onMapReady={() => {
          mapView?.current?.fitToCoordinates?.(stationCoordinates as LatLng[], {
            edgePadding: {
              right: width / 20,
              bottom: height / 20,
              left: width / 20,
              top: height / 20,
            },
          });
        }}>
        {stationCoordinates.map((station, index) => (
          <React.Fragment key={index}>
            <Marker coordinate={station as LatLng} />
            <Polyline
              coordinates={stationCoordinates as LatLng[]}
              strokeColor={trainColor as string}
              strokeWidth={3}
            />
          </React.Fragment>
        ))}
      </MapView>
      <TabView
        selectedIndex={selectedTab}
        style={styles.tabView}
        onSelect={index => setSelectedTab(index)}>
        <Tab title={strings.trainRoute}>
          <TrainRoute
            time={time}
            trainColor={trainColor}
            originTime={originTime}
            destinationTimeWithDelay={destinationTimeWithDelay}
            destinationTime={destinationTime}
            stops={train.route.stops}
          />
        </Tab>
        <Tab title={strings.trainDetails}>
          <TrainDetails
            train={train}
            originTime={originTime}
            destinationTimeWithDelay={destinationTimeWithDelay}
            destinationTime={destinationTime}
            originStation={originStation}
            destinationStation={destinationStation}
          />
        </Tab>
      </TabView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  mapView: {
    height: '30%',
    width: '100%',
  },
  tabView: {
    flex: 1,
  },
});
