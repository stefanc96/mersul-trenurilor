import {Stop} from '../../../../../types';
import {ColorValue} from 'react-native';

export interface PropsTrainRoute {
  stops: Stop[];
  trainColor: ColorValue;
  originTime: string;
  destinationTime: string;
  destinationTimeWithDelay: string;
}
