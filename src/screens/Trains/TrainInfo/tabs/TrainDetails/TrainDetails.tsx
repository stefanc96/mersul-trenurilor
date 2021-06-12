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
import {chain, reduce} from 'lodash';
import {
  convertToHoursAndMinutes,
  getTrainStopStatus,
  getTrainTimeDifference,
} from '../../../../../utils';
import {strings} from '../../../../../locales';
import {StyleSheet} from 'react-native';
import {TrainStopStatus} from '../../../../../types';

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
  const [showModal, setShowModal] = useState(false);
  const [notificationTimeIndex, setNotificationTime] = useState(null);
  const [selectedStationIndex, setSelectedStationIndex] = useState(null);
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

  const availableStops = chain(stops)
    .filter((stop, index) => {
      const previousStop = stops[index - 1];
      const arrivalTime = convertToHoursAndMinutes(
        previousStop?.oraS || stop.oraS,
      );
      const leavingTime = convertToHoursAndMinutes(stop.oraP);
      const rideStopStatus = getTrainStopStatus(
        arrivalTime,
        leavingTime,
        originTime,
        destinationTime,
        destinationTimeWithDelay,
      );
      return rideStopStatus === TrainStopStatus.NeedsToArrive;
    })
    .value();

  const onSelectTime = (index: IndexPath) => {
    setNotificationTime(index?.row);
    setShowModal(false);
  };

  const onSelectStation = (index: IndexPath) => {
    setSelectedStationIndex(index?.row);
  };

  const onBackdropPress = () => {
    setNotificationTime(null);
    setSelectedStationIndex(null);
    setShowModal(false);
  };

  const onPressNotificationCheck = () => {
    setShowModal(true);
  };

  return (
    <Layout>
      {availableStops.length ? (
        <>
          <Modal
            visible={showModal}
            backdropStyle={styles.backdrop}
            onBackdropPress={onBackdropPress}>
            <Card disabled={true} style={{}}>
              {selectedStationIndex ? (
                <>
                  <Text category={'h6'} style={styles.title}>
                    {strings.notificationTime}
                  </Text>
                  <Select
                    value={
                      notificationTimeIndex
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
            accessoryRight={() => <CheckBox />}
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
      <ListItem title={`${strings.from}: ${originStation.denStaOrigine}`} />
      <Divider />
      <ListItem
        title={`${strings.to}: ${destinationStation.denStaDestinatie}`}
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
