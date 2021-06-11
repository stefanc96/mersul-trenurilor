import React, {useState} from 'react';
import {Layout, ListItem} from '@ui-kitten/components';
import {MEDIUM_SIZE, ThemeContext} from '../../theme';
import {Switch} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from '../../store';
import {setThemeId} from '../../store/reducers/settings';

export const Settings = () => {
  const themeContext = React.useContext(ThemeContext);
  const {themeId} = useSelector((state: AppState) => ({
    themeId: state.settings.themeId,
  }));
  const dispatch = useDispatch();
  const [hasDarkModeEnabled, setHasDarkModeEnabled] = useState(
    themeContext.theme === 'dark' || themeId === 'dark',
  );

  const onPressEnableDarkMode = () => {
    if (hasDarkModeEnabled) {
      dispatch(setThemeId('light'));
    } else {
      dispatch(setThemeId('dark'));
    }
    setHasDarkModeEnabled(!hasDarkModeEnabled);
  };

  return (
    <Layout style={styles.container}>
      <ListItem
        onPress={onPressEnableDarkMode}
        title="Enable dark mode"
        accessoryRight={() => <Switch value={hasDarkModeEnabled} />}
      />
    </Layout>
  );
};

const styles = {
  container: {
    padding: MEDIUM_SIZE,
    flex: 1,
  },
};
