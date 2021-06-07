import {ColorValue} from 'react-native';
import {Stop} from '../../types';

export interface RideListItemProps {
  trainColor: ColorValue;
  stop: Stop;
  index: number;
}
