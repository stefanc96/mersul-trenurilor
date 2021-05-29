import React, {useEffect} from 'react';
import {
  Appearance,
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from 'react-native';
import {ApplicationProvider, IconRegistry, Layout} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import {appStyles, ThemeContext} from './src/theme';
import {AppNavigator} from './src/navigation';
import {IonIconsPack} from './src/theme/icons';
const evaTheme: Record<string, Record<string, string>> = eva;

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const [themeId, setThemeId] = React.useState(useColorScheme() as string);

  const toggleTheme = () => {
    const nextTheme = themeId === 'light' ? 'dark' : 'light';
    setThemeId(nextTheme);
  };

  const onChangeTheme = (themeOS: Appearance.AppearancePreferences) => {
    setThemeId(themeOS.colorScheme as string);
  };

  useEffect(() => {
    Appearance.addChangeListener(onChangeTheme);
    return () => {
      Appearance.removeChangeListener(onChangeTheme);
    };
  }, []);

  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <IconRegistry icons={[EvaIconsPack, IonIconsPack]} />
      <ThemeContext.Provider value={{theme: themeId, toggleTheme}}>
        <ApplicationProvider {...eva} theme={evaTheme[themeId]}>
          <Layout style={appStyles.container}>
            <SafeAreaView style={appStyles.container}>
              <AppNavigator />
            </SafeAreaView>
          </Layout>
        </ApplicationProvider>
      </ThemeContext.Provider>
    </>
  );
};

export default App;
