import {Stop, Train} from '../../../../types';

export interface PropsTrainListItem {
  train: Train;
  onPress: ({
    train,
    statieOrigine,
    statieDestinatie,
  }: {
    train: Train;
    statieOrigine: Stop;
    statieDestinatie: Stop;
  }) => void;
}

export enum TrainRideStatus {
  ReadyToStart,
  InProgress,
  Finished,
}
