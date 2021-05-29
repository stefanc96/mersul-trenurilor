import {Stop, Train} from '../../../../interfaces';

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
