import {Train} from '../../../../types';
import {OpaqueColorValue} from 'react-native';

export interface PropsTrainListItem {
  train: Train;
  onPress: (train: Train, trainColor: string | typeof OpaqueColorValue) => void;
}

export enum TrainRideStatus {
  ReadyToStart,
  InProgress,
  Finished,
}
