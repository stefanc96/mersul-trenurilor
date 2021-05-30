import {Train} from '../../../../types';

export interface PropsTrainListItem {
  train: Train;
  onPress: (train: Train) => void;
}

export enum TrainRideStatus {
  ReadyToStart,
  InProgress,
  Finished,
}
