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
import {PropsTrainDetails} from './TrainDetails.interface';
import {reduce} from 'lodash';
import {getTrainTimeDifference} from '../../../../../utils';
import {strings} from '../../../../../locales';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  addTrainRide,
  removeTrainRide,
} from '../../../../../store/reducers/settings';
import {
  getAvailableStops,
  getTrainNotificationIndex,
} from './TrainDetails.utils';
import {AppState, TrainRide} from '../../../../../store';

export const TRAIN_NOTIFICATION_TIMES = [5, 10, 15, 20, 25, 30];

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
      setNotificationTimeIndex(index.row);
      setSelectedStationIndex(null);
    }
    setShowModal(false);
    dispatch(
      addTrainRide({
        train,
        timestamp: new Date().toISOString(),
      }),
    );
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

  const onPressNotificationCheck = () => {
    if (notificationTrainIndex === -1) {
      setShowModal(true);
    } else {
      dispatch(removeTrainRide(notificationTrainIndex));
    }
  };

  return (
    <Layout>
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
                    {TRAIN_NOTIFICATION_TIMES.map(time => (
                      <SelectItem key={time} title={`${time}m`} />
                    ))}
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
      <ListItem title={`${strings.totalKm}: ${(totalKm / 1000).toFixed(2)}`} />
      <Divider />
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
});
