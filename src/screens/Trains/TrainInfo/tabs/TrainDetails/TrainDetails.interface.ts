import {Stop, Train} from '../../../../../types';

export interface PropsTrainDetails {
  train: Train;
  originStation: Stop;
  destinationStation: Stop;
  originTime: string;
  destinationTime: string;
  destinationTimeWithDelay: string;
}
