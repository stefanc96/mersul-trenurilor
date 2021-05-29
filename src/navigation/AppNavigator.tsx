import {NavigationContainer} from '@react-navigation/native';
import {ScreenEnum} from '../interfaces';
import {Profile, StationTab, TrainInfo, TrainsTab} from '../screens';
import React from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {BottomNavigation, BottomNavigationTab} from '@ui-kitten/components';
import {createStackNavigator} from '@react-navigation/stack';

const {Navigator, Screen} = createBottomTabNavigator();
const Stack = createStackNavigator();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode={'none'}>
        <Stack.Screen name={ScreenEnum.Dashboard} component={BottomNavigator} />
        <Stack.Screen name={ScreenEnum.TrainInfo} component={TrainInfo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const BottomTabBar: React.FC<BottomTabBarProps> = props => {
  const {navigation, state} = props;

  return (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index])}>
      <BottomNavigationTab title={ScreenEnum.TrainsTab} />
      <BottomNavigationTab title={ScreenEnum.StationsTab} />
      <BottomNavigationTab title={ScreenEnum.ProfileTab} />
    </BottomNavigation>
  );
};

const BottomNavigator = () => {
  return (
    <Navigator tabBar={props => <BottomTabBar {...props} />}>
      <Screen name={ScreenEnum.TrainsTab} component={TrainsTab} />
      <Screen name={ScreenEnum.StationsTab} component={StationTab} />
      <Screen name={ScreenEnum.ProfileTab} component={Profile} />
    </Navigator>
  );
};
