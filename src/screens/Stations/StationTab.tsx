import React, {useState} from 'react';
import {StationListItem} from './components';
import {Station} from '../../types';
import {chain} from 'lodash';
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
import {clearString} from '../../utils/stringUtils';
import {useSelector} from 'react-redux';
import {AppState} from '../../store';

export const StationTab = () => {
  const theme = useTheme();
  const initialStations: Array<Station> = useSelector(
    (state: AppState) => state.timetable.stations,
  );
  const [searchString, setSearchString] = useState('');

  const stations = chain(initialStations)
    .filter(station => {
      return clearString(station.name).includes(clearString(searchString));
    })
    .sortBy('name')
    .value();

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
        placeholder={strings.searchStation}
        value={searchString}
        autoCorrect={false}
        style={{marginBottom: SMALL_SIZE}}
        onChangeText={setSearchString}
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
