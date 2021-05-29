import React, {useState} from 'react';
import {StationListItem} from './components';
import {Station} from '../../types';
import {deburr} from 'lodash';
import {
  Divider,
  Icon,
  Input,
  Layout,
  List,
  Text,
  useTheme,
} from '@ui-kitten/components';
import {MEDIUM_SIZE, SMALL_SIZE} from '../../theme';
import {strings} from '../../locales';
import {IconPack} from '../../theme/icons/Icon.interface';
import {StyleSheet} from 'react-native';

const mersulTrenurilor = require('../../../mersul-trenurilor.json');

const compareStation = (stationTo: Station, stationFrom: Station) => {
  if (stationTo.name > stationFrom.name) {
    return 1;
  } else if (stationTo.name < stationFrom.name) {
    return -1;
  }
  return 0;
};
const initialStations: Station[] = mersulTrenurilor.cfr.stations;

export const StationTab = () => {
  const theme = useTheme();
  const [stations, setStations] = useState(
    initialStations.sort(compareStation),
  );
  const [searchString, setSearchString] = useState('');

  const onSearchStation = (inputValue: string) => {
    const searchedStations = initialStations.filter(station => {
      if (
        deburr(station.name).toLowerCase().includes(inputValue.toLowerCase())
      ) {
        return station;
      }
    });
    setSearchString(inputValue);
    setStations(searchedStations.sort(compareStation));
  };

  const renderStationListItem = ({item}: {item: Station}) => {
    return <StationListItem station={item} />;
  };

  const stationKeyExtractor = (item: Station, index: number) =>
    `${item.cod} - ${index}`;

  return (
    <Layout style={styles.container}>
      <Input
        accessoryLeft={() => (
          <Icon
            pack={IconPack.Ion}
            name={'search'}
            style={[styles.searchIcon, {tintColor: theme['text-basic-color']}]}
          />
        )}
        placeholder={strings.leavingStation}
        value={searchString}
        autoCorrect={false}
        style={{marginBottom: SMALL_SIZE}}
        onChangeText={onSearchStation}
      />
      <List
        bounces={false}
        data={stations}
        ItemSeparatorComponent={Divider}
        ListEmptyComponent={() => (
          <Text style={styles.emptyLabel}>{strings.noStation}</Text>
        )}
        renderItem={renderStationListItem}
        keyExtractor={stationKeyExtractor}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  emptyLabel: {
    textAlign: 'center',
  },
  container: {
    padding: MEDIUM_SIZE,
    flex: 1,
  },
  searchIcon: {
    height: 20,
  },
});
