import React from 'react';
import {Station} from '../../../../types';
import {ListItem, Text} from '@ui-kitten/components';
import {strings} from '../../../../locales';

export const StationListItem = ({
  station: station,
  numberOfTrains,
  onPressStation,
}: {
  station: Station;
  numberOfTrains: number;
  onPressStation: () => void;
}) => {
  return (
    <ListItem
      title={station.name}
      onPress={onPressStation}
      accessoryRight={() => (
        <Text>{`${numberOfTrains} ${strings.trains.toLowerCase()}`}</Text>
      )}
    />
  );
};
