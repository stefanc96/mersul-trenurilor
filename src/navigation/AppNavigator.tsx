import {NavigationContainer} from '@react-navigation/native';
import {ScreenEnum} from '../types';
import {
  Settings,
  StationTab,
  TrainInfo,
  TrainsTab,
  Splash,
  StationInfo,
} from '../screens';
import React from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from '@ui-kitten/components';
import {createStackNavigator} from '@react-navigation/stack';
import {IconPack} from '../theme/icons/Icon.interface';
import {strings} from '../locales';

const {Navigator, Screen} = createBottomTabNavigator();
const Stack = createStackNavigator();

const TrainStationIcon = (props: any) => (
  <Icon {...props} name="globe-outline" pack={IconPack.Ion} />
);

const TrainIcon = (props: any) => (
  <Icon {...props} name="train-outline" pack={IconPack.Ion} />
);

const SettingsIcon = (props: any) => (
  <Icon {...props} name="cog-outline" pack={IconPack.Ion} />
);

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode={'none'}>
        <Stack.Screen name={ScreenEnum.SplashScreen} component={Splash} />
        <Stack.Screen name={ScreenEnum.Dashboard} component={BottomNavigator} />
        <Stack.Screen name={ScreenEnum.TrainInfo} component={TrainInfo} />
        <Stack.Screen name={ScreenEnum.StationInfo} component={StationInfo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const BottomTabBar: React.FC<BottomTabBarProps> = props => {
  const {navigation, state} = props;

  return (
    <BottomNavigation
      shouldRasterizeIOS
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index])}>
      <BottomNavigationTab title={strings.trains} icon={TrainIcon} />
      <BottomNavigationTab title={strings.stations} icon={TrainStationIcon} />
      <BottomNavigationTab title={strings.settings} icon={SettingsIcon} />
    </BottomNavigation>
  );
};

const BottomNavigator = () => {
  return (
    <Navigator tabBar={props => <BottomTabBar {...props} />}>
      <Screen name={ScreenEnum.TrainsTab} component={TrainsTab} />
      <Screen name={ScreenEnum.StationsTab} component={StationTab} />
      <Screen name={ScreenEnum.ProfileTab} component={Settings} />
    </Navigator>
  );
};
