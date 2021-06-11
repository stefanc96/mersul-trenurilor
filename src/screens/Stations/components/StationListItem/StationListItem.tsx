import React from 'react';
import {Station} from '../../../../types';
import {ListItem, Text} from '@ui-kitten/components';
import {strings} from '../../../../locales';

export const StationListItem = ({
  station: station,
  numberOfTrains,
}: {
  station: Station;
  numberOfTrains: number;
}) => {
  return (
    <ListItem
      title={station.name}
      accessoryRight={() => (
        <Text>{`${numberOfTrains} ${strings.trains.toLowerCase()}`}</Text>
      )}
    />
  );
};
