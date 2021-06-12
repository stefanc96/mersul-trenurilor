import {ColorValue} from 'react-native';
import {Stop, TrainStopStatus} from '../../types';

export interface RideListItemProps {
  trainColor: ColorValue;
  stop: Stop;
  index: number;
  arrivalTime: string;
  leavingTime: string;
  rideStopStatus: TrainStopStatus;
  km: number;
}
