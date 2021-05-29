import React from 'react';
import {Station} from '../../../../types';
import {ListItem} from '@ui-kitten/components';

export const StationListItem = ({station: station}: {station: Station}) => {
  return <ListItem title={station.name} />;
};
