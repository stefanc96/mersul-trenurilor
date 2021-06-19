import React, {Ref, useEffect, useRef, useState} from 'react';
import MapView, {LatLng, Marker, Polyline} from 'react-native-maps';
import {chain, head, last} from 'lodash';
import {appStyles} from '../../../theme';
import {Station, Stop, Train} from '../../../types';
import {useSelector} from 'react-redux';
import {AppState} from '../../../store';
import {
  Icon,
  Layout,
  Tab,
  TabView,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {
  ColorValue,
  Platform,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import {BackIcon} from '../../../components';
import {StackActions} from '@react-navigation/native';
import {TrainDetails, TrainRoute} from './tabs';
import {strings} from '../../../locales';
import {
  convertToHoursAndMinutes,
  convertToHoursAndMinutesWidthDelay,
} from '../../../utils';
import {getTrainCurrentCoordinates} from './TrainInfo.utils';
import {IconPack} from '../../../theme/icons/Icon.interface';

const TIME_TO_UPDATE = 5 * 1000;
export const MarkerIcon = (props: any) => (
  <Icon {...props} pack={IconPack.MaterialCommunity} name="map-marker" />
);

export const TrainIcon = (props: any) => (
  <Icon {...props} pack={IconPack.MaterialCommunity} name="bus-marker" />
);

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
  let trainCoordinates: LatLng | null = null;

  const stationCoordinates = chain(train.route.stops)
    .map((currentStop, index) => {
      const nextStation = stations.find(
        station => station.cod === currentStop.codStaOrigine,
      );
      if (nextStation) {
        const lastStation = stations.find(
          station =>
            station.cod === train.route.stops[index - 1]?.codStaOrigine,
        );

        const newTrainCoordinates = getTrainCurrentCoordinates(
          currentStop,
          train.route.stops?.[index + 1],
          lastStation as Station,
          nextStation as Station,
        );
        if (newTrainCoordinates && !trainCoordinates) {
          trainCoordinates = newTrainCoordinates;
        }
        return {
          latitude: Number(nextStation?.coordinates.lat),
          longitude: Number(nextStation?.coordinates.lon),
        };
      }
    })
    .without(undefined)
    .value();

  if (!trainCoordinates) {
    trainCoordinates = last(stationCoordinates) as LatLng;
  }

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
        zoomEnabled={false}
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
        {trainCoordinates && (
          <Marker coordinate={trainCoordinates as LatLng}>
            <TrainIcon style={styles.trainMarker} />
          </Marker>
        )}
        {stationCoordinates.map((station, index) => (
          <React.Fragment key={index}>
            <Marker coordinate={station as LatLng} flat>
              <MarkerIcon
                style={[
                  {
                    color: trainColor,
                  },
                  styles.stationIcon,
                ]}
              />
            </Marker>
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
        swipeEnabled={false}
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
  trainMarker: {
    height: 50,
    bottom: Platform.OS === 'android' ? 0 : 30,
    right: 8,
    color: 'black',
  },
  stationIcon: {
    height: 20,
    bottom: Platform.OS === 'android' ? 0 : 10,
  },
});
