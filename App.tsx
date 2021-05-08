import React from 'react';
import {
    SafeAreaView,
    StatusBar,
    useColorScheme,
} from 'react-native';

import {NavigationContainer} from "@react-navigation/native";
import {Dashboard} from "./src/screens";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Stations} from "./src/screens/Stations";

const Tab = createBottomTabNavigator();

const App = () => {
    const isDarkMode = useColorScheme() === 'dark';

    return (
        <NavigationContainer>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'}/>
            <SafeAreaView style={{flex: 1}}>
                <Tab.Navigator>
                    <Tab.Screen name="Trains" component={Dashboard} />
                    <Tab.Screen name="Stations" component={Stations} />
                </Tab.Navigator>
            </SafeAreaView>
        </NavigationContainer>
    );
};

export default App;
