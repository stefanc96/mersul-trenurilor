import React, {useEffect} from 'react';
import {Appearance, StatusBar, useColorScheme} from 'react-native';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {IonIconsPack} from './icons';
import * as eva from '@eva-design/eva';
import {ThemeContext} from './ThemeContextProvider';
import {AppState} from '../store';
import {useSelector} from 'react-redux';

const evaTheme: Record<string, Record<string, string>> = eva;

export const ThemeWrapper: React.FC = ({children}) => {
  const settingsThemeId = useSelector(
    (state: AppState) => state?.settings?.themeId,
  );
  const deviceThemeId = useColorScheme() || 'light';
  const [themeId, setThemeId] = React.useState(
    settingsThemeId || deviceThemeId,
  );

  console.log(themeId);

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
      <IconRegistry icons={[EvaIconsPack, IonIconsPack]} />
      <ThemeContext.Provider value={{theme: themeId, toggleTheme}}>
        <ApplicationProvider {...eva} theme={evaTheme[themeId]}>
          {children}
        </ApplicationProvider>
      </ThemeContext.Provider>
    </>
  );
};
