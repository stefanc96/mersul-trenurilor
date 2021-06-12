import React, {useEffect, useRef, useState} from 'react';
import {Appearance, StatusBar, StyleSheet, useColorScheme} from 'react-native';
import {
  ApplicationProvider,
  IconRegistry,
  Layout,
  Spinner,
  Text,
} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {IonIconsPack} from './icons';
import * as eva from '@eva-design/eva';
import {ThemeContext} from './ThemeContextProvider';
import {AppState} from '../store';
import {useSelector} from 'react-redux';
import {strings} from '../locales';
import {MaterialCommunityIconsPack} from './icons/MaterialCommunityIcon';

const evaTheme: Record<string, Record<string, string>> = eva;

const TIME_TO_CHANGE_LANGUAGE = 5000;

export const ThemeWrapper: React.FC = ({children}) => {
  const localesId = useSelector((state: AppState) => state?.settings?.localeId);
  const settingsThemeId = useSelector(
    (state: AppState) => state?.settings?.themeId,
  );
  let isFirstTime = useRef(true);
  const [loading, setLoading] = useState(false);
  const deviceThemeId = useColorScheme() || 'light';
  const [themeId, setThemeId] = React.useState(
    settingsThemeId || deviceThemeId,
  );

  const toggleTheme = () => {
    const nextTheme = themeId === 'light' ? 'light' : 'dark';
    setThemeId(nextTheme);
  };

  useEffect(() => {
    if (settingsThemeId) {
      setThemeId(settingsThemeId as string);
    }
  }, [settingsThemeId]);

  const onChangeTheme = (deviceSettings: Appearance.AppearancePreferences) => {
    if (!settingsThemeId) {
      setThemeId(deviceSettings.colorScheme as string);
    }
  };
  useEffect(() => {
    if (isFirstTime.current) {
      isFirstTime.current = false;
    } else {
      const languageTimeout = setTimeout(() => {
        setLoading(false);
      }, TIME_TO_CHANGE_LANGUAGE);
      setLoading(true);
      strings.setLanguage(localesId);
      return () => {
        clearTimeout(languageTimeout);
      };
    }
  }, [localesId]);

  useEffect(() => {
    strings.setLanguage(localesId);
    Appearance.addChangeListener(onChangeTheme);
    return () => {
      Appearance.removeChangeListener(onChangeTheme);
    };
  }, []);

  return (
    <>
      <StatusBar
        barStyle={themeId === 'light' ? 'dark-content' : 'light-content'}
        backgroundColor={themeId === 'light' ? '#FFFFFF' : '#222B45'}
      />
      <IconRegistry
        icons={[EvaIconsPack, IonIconsPack, MaterialCommunityIconsPack]}
      />
      <ThemeContext.Provider value={{theme: themeId, toggleTheme}}>
        <ApplicationProvider {...eva} theme={evaTheme[themeId]}>
          {!loading ? (
            children
          ) : (
            <Layout style={styles.loadingContainer}>
              <Spinner />
              <Text category={'h5'} style={styles.loadingText}>
                {strings.changingLocales}
              </Text>
            </Layout>
          )}
        </ApplicationProvider>
      </ThemeContext.Provider>
    </>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 20,
  },
});
