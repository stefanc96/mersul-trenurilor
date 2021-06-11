import React from 'react';
import {Station} from '../../../../types';
import {ListItem, Text} from '@ui-kitten/components';
import {useSelector} from 'react-redux';
import {AppState} from '../../../../store';
import {strings} from '../../../../locales';

export const StationListItem = ({station: station}: {station: Station}) => {
  const stationWithTrains = useSelector(
    (state: AppState) => state.timetable.stationWithTrains,
  );

  return (
    <ListItem
      title={station.name}
      accessoryRight={() => (
        <Text>{`${
          stationWithTrains[station.name].length
        } ${strings.trains.toLowerCase()}`}</Text>
      )}
    />
  );
};
