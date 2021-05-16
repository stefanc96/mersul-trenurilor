import React from 'react';
import {
    SafeAreaView,
    StatusBar,
    useColorScheme,
} from 'react-native';

import {NavigationContainer} from "@react-navigation/native";
import {Profile, Stations, TrainInfo, Trains} from "./src/screens";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {ScreenEnum} from "./src/interfaces";
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TrainStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name={ScreenEnum.TrainsTab} component={Trains} />
            <Stack.Screen name={ScreenEnum.TrainInfo} component={TrainInfo} />
        </Stack.Navigator>
    )
}

const App = () => {
    const isDarkMode = useColorScheme() === 'dark';

    return (
        <NavigationContainer>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'}/>
            <SafeAreaView style={{flex: 1}}>
                <Tab.Navigator>
                    <Tab.Screen name={ScreenEnum.TrainsTab} component={TrainStack} />
                    <Tab.Screen name={ScreenEnum.StationsTab} component={Stations} />
                    <Tab.Screen name={ScreenEnum.ProfileTab} component={Profile} />
                </Tab.Navigator>
            </SafeAreaView>
        </NavigationContainer>
    );
};

export default App;
