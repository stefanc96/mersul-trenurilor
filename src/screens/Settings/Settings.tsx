import React, {useState} from 'react';
import {
  Divider,
  Layout,
  ListItem,
  Toggle,
  useTheme,
} from '@ui-kitten/components';
import {MEDIUM_SIZE} from '../../theme';
import {Image, TouchableWithoutFeedback} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from '../../store';
import {setLocaleId, setThemeId} from '../../store/reducers/settings';
import {Row} from '../../components';
import {strings} from '../../locales';

export const Settings = () => {
  const settings = useSelector((state: AppState) => state.settings);
  const theme = useTheme();
  const dispatch = useDispatch();
  const [hasDarkModeEnabled, setHasDarkModeEnabled] = useState(
    settings?.themeId === 'dark',
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

  const selectedFlagStyle = {
    borderColor: theme['text-basic-color'],
  };

  return (
    <Layout style={styles.container}>
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
        title="Select language"
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
};
