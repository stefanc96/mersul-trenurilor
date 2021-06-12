import {Stop} from '../../../../../types';
import {ColorValue} from 'react-native';

export interface PropsTrainRoute {
  stops: Stop[];
  originStation: Stop;
  destinationStation: Stop;
  trainColor: ColorValue;
}
