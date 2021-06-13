import React, {useState} from 'react';
import {
  Divider,
  Layout,
  ListItem,
  Toggle,
  Text,
  useTheme,
  Icon,
} from '@ui-kitten/components';
import {MEDIUM_SIZE} from '../../theme';
import {
  Image,
  TouchableWithoutFeedback,
  Linking,
  View,
  useColorScheme,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from '../../store';
import {setLocaleId, setThemeId} from '../../store/reducers/settings';
import {Row} from '../../components';
import {strings} from '../../locales';
import {noop} from 'lodash';
import InAppReview from 'react-native-in-app-review';

export const ArrowIcon = (props: any) => (
  <Icon {...props} name="arrow-ios-forward-outline" />
);

const TIMETABLE_DATA_URL =
  'https://data.gov.ro/dataset/mers-tren-sntfc-cfr-calatori-s-a';

export const Settings = () => {
  const settings = useSelector((state: AppState) => state.settings);
  const theme = useTheme();
  const dispatch = useDispatch();
  const colorScheme = useColorScheme();
  const [hasDarkModeEnabled, setHasDarkModeEnabled] = useState(
    (settings?.themeId || colorScheme) === 'dark',
  );

  const onPressEnableDarkMode = () => {
    if (hasDarkModeEnabled) {
      dispatch(setThemeId('light'));
    } else {
      dispatch(setThemeId('dark'));
    }
    setHasDarkModeEnabled(!hasDarkModeEnabled);
  };

  const onPressFlag = (localeId: string) => {
    dispatch(setLocaleId(localeId));
  };

  const onPressLeaveReview = () => {
    if (InAppReview.isAvailable()) {
      InAppReview.RequestInAppReview().catch(noop);
    }
  };

  const onPressShareWithFriends = () => {};

  const onPressTimetablesData = () => {
    Linking.openURL(TIMETABLE_DATA_URL).catch(noop);
  };

  const selectedFlagStyle = {
    borderColor: theme['text-basic-color'],
  };

  return (
    <Layout style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../../assets/images/app_icon.png')}
          style={styles.image}
        />
        <Text category={'h6'}>Mersul trenurilor</Text>
        <Text category={'s1'}>@2021 Stefan Chelaru</Text>
      </View>
      <ListItem
        onPress={onPressEnableDarkMode}
        title={strings.enableDarkMode}
        accessoryRight={() => (
          <Toggle
            onChange={onPressEnableDarkMode}
            checked={hasDarkModeEnabled}
          />
        )}
      />
      <Divider />
      <ListItem
        onPress={onPressEnableDarkMode}
        title={strings.selectLanguage}
        accessoryRight={() => (
          <Row>
            <TouchableWithoutFeedback onPress={() => onPressFlag('ro')}>
              <Image
                source={require('../../../assets/images/romania.png')}
                style={[
                  styles.flag,
                  settings.localeId === 'ro' && selectedFlagStyle,
                ]}
              />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => onPressFlag('en')}>
              <Image
                style={[
                  styles.flag,
                  settings.localeId === 'en' && selectedFlagStyle,
                ]}
                source={require('../../../assets/images/united-states.png')}
              />
            </TouchableWithoutFeedback>
          </Row>
        )}
      />
      <Divider />
      <ListItem
        onPress={onPressLeaveReview}
        title={strings.leaveReview}
        accessoryRight={ArrowIcon}
      />
      <Divider />
      <ListItem
        onPress={onPressShareWithFriends}
        title={strings.shareWithFriends}
        accessoryRight={ArrowIcon}
      />
      <Divider />
      <ListItem
        onPress={onPressTimetablesData}
        title={strings.timetablesData}
        accessoryRight={ArrowIcon}
      />
      <Divider />
    </Layout>
  );
};

const styles = {
  container: {
    padding: MEDIUM_SIZE,
    flex: 1,
  },
  flag: {
    borderWidth: 2,
    borderColor: 'transparent',
    borderRadius: 20,
    width: 40,
    height: 40,
    marginLeft: 10,
  },
  image: {
    width: 150,
    height: 150,
  },
  header: {
    alignItems: 'center',
  },
};
