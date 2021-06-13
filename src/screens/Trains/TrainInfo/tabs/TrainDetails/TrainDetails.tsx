import React, {useState} from 'react';
import {
  Card,
  CheckBox,
  Divider,
  IndexPath,
  Layout,
  ListItem,
  Modal,
  Select,
  SelectItem,
  Text,
} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
import {PropsTrainDetails} from './TrainDetails.interface';
import {reduce} from 'lodash';
import {getArriveDate, getTrainTimeDifference} from '../../../../../utils';
import {strings} from '../../../../../locales';
import {useDispatch, useSelector} from 'react-redux';
import {
  addTrainRide,
  removeTrainRide,
} from '../../../../../store/reducers/settings';
import {
  getAvailableStops,
  getTimeItems,
  getTrainNotificationIndex,
  getTrainNotificationTime,
  handlePermissionReject,
} from './TrainDetails.utils';
import {AppState, TrainRide} from '../../../../../store';
import PushNotification from 'react-native-push-notification';
import {TRAIN_NOTIFICATION_TIMES} from './TrainDetails.const';
import {replaceKeysInTranslation} from '../../../../../locales/locale.utils';
import {TRAIN_SERVICES_MAP} from '../../../../../fixtures/trainServicesMap';
import {TrainServiceItem} from '../../../../../components';
import {ScrollView} from 'react-native-gesture-handler';

export const TrainDetails: React.FC<PropsTrainDetails> = ({
  train,
  originStation,
  destinationStation,
  originTime,
  destinationTime,
  destinationTimeWithDelay,
}) => {
  const {stops} = train.route;
  const dispatch = useDispatch();
  const trainRides: Array<TrainRide> = useSelector(
    (state: AppState) => state.settings.trainRides,
  );
  const [showModal, setShowModal] = useState(false);
  const [notificationTimeIndex, setNotificationTimeIndex] = useState<
    number | null
  >(null);
  const [selectedStationIndex, setSelectedStationIndex] = useState<
    number | null
  >(null);
  const totalTime = getTrainTimeDifference(
    originStation.oraS,
    destinationStation.oraS,
  );
  const totalKm = reduce(
    stops,
    (sum, stop) => {
      return sum + Number(stop.km);
    },
    0,
  );

  const notificationTrainIndex = getTrainNotificationIndex(trainRides, train);

  const availableStops = getAvailableStops(
    stops,
    originTime,
    destinationTime,
    destinationTimeWithDelay,
  );

  const onSelectTime = (index: IndexPath | IndexPath[]) => {
    if (index instanceof IndexPath) {
      if (selectedStationIndex) {
        const arriveDate = getArriveDate(
          availableStops[selectedStationIndex],
          originTime,
          destinationTime,
        );

        const notificationDate = getTrainNotificationTime(
          arriveDate,
          TRAIN_NOTIFICATION_TIMES[index.row],
        );

        dispatch(
          addTrainRide({
            train,
            timestamp: notificationDate.toISOString(),
          }),
        );

        PushNotification.localNotificationSchedule({
          message: replaceKeysInTranslation(strings.trainNotificationMessage, {
            ['DESTINATION']: availableStops[selectedStationIndex].denStaOrigine,
            ['TIME']: TRAIN_NOTIFICATION_TIMES[index.row].toString(),
          }),
          date: notificationDate,
          id: Number(train.info.numar),
          allowWhileIdle: true,
        });
      }
      setNotificationTimeIndex(null);
      setSelectedStationIndex(null);
    }
    setShowModal(false);
  };

  const onSelectStation = (index: IndexPath | IndexPath[]) => {
    if (index instanceof IndexPath) {
      setSelectedStationIndex(index.row);
    }
  };

  const onBackdropPress = () => {
    setNotificationTimeIndex(null);
    setSelectedStationIndex(null);
    setShowModal(false);
  };

  const onPermissionGranted = () => {
    if (notificationTrainIndex === -1) {
      setShowModal(true);
    } else {
      PushNotification.cancelLocalNotifications({
        id: trainRides[notificationTrainIndex].train.info.numar,
      });
      dispatch(removeTrainRide(notificationTrainIndex));
    }
  };

  const onPressNotificationCheck = () => {
    PushNotification.checkPermissions(permissions => {
      if (permissions.badge || permissions.alert) {
        onPermissionGranted();
      } else {
        PushNotification.requestPermissions(['alert', 'badge']).then(
          permissionsState => {
            if (permissionsState.badge || permissionsState.alert) {
              onPermissionGranted();
            } else {
              handlePermissionReject();
            }
          },
        );
      }
    });
  };

  return (
    <Layout>
      <ScrollView>
        {availableStops.length ? (
          <>
            <Modal
              visible={showModal}
              backdropStyle={styles.backdrop}
              onBackdropPress={onBackdropPress}>
              <Card disabled={true} style={styles.card}>
                {selectedStationIndex !== null ? (
                  <>
                    <Text category={'h6'} style={styles.title}>
                      {strings.notificationTime}
                    </Text>
                    <Select
                      value={
                        notificationTimeIndex !== null
                          ? `${TRAIN_NOTIFICATION_TIMES?.[notificationTimeIndex]}m`
                          : strings.time
                      }
                      onSelect={onSelectTime}>
                      {getTimeItems(
                        availableStops,
                        originTime,
                        destinationTime,
                        selectedStationIndex,
                      ).map(time => {
                        return <SelectItem key={time} title={`${time}m`} />;
                      })}
                    </Select>
                  </>
                ) : (
                  <>
                    <Text category={'h6'} style={styles.title}>
                      {strings.selectStation}
                    </Text>
                    <Select
                      value={
                        selectedStationIndex
                          ? availableStops[selectedStationIndex]?.denStaOrigine
                          : strings.station
                      }
                      onSelect={onSelectStation}>
                      {availableStops.map(stop => (
                        <SelectItem
                          key={stop.denStaOrigine}
                          title={stop.denStaOrigine}
                        />
                      ))}
                    </Select>
                  </>
                )}
              </Card>
            </Modal>
            <ListItem
              onPress={onPressNotificationCheck}
              title={strings.notificationQuestion}
              accessoryRight={() => (
                <CheckBox
                  checked={notificationTrainIndex !== -1}
                  onPress={onPressNotificationCheck}
                />
              )}
            />
            <Divider />
          </>
        ) : null}
        <ListItem
          title={`${strings.name}: ${train.info.categorieTren} ${train.info.numar}`}
        />
        <Divider />
        <ListItem title={`${strings.operator}: SNCFR`} />
        <Divider />
        <ListItem title={`${strings.from} ${originStation.denStaOrigine}`} />
        <Divider />
        <ListItem
          title={`${strings.to} ${destinationStation.denStaDestinatie}`}
        />
        <Divider />
        <ListItem
          title={`${strings.totalTime}: ${totalTime.hours}h${totalTime.minutes}m`}
        />
        <Divider />
        <ListItem
          title={`${strings.totalKm}: ${(totalKm / 1000).toFixed(2)}`}
        />
        <Divider />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.trainServices}>
          {TRAIN_SERVICES_MAP[train.info.servicii].map(trainService => (
            <TrainServiceItem key={trainService} trainService={trainService} />
          ))}
        </ScrollView>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  card: {
    width: 250,
  },
  title: {
    alignSelf: 'center',
    textAlign: 'center',
    marginBottom: 20,
  },
  trainServices: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
});
