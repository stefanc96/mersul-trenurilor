import React from 'react';
import {
    SafeAreaView,
    StatusBar,
    useColorScheme,
} from 'react-native';

import {NavigationContainer} from "@react-navigation/native";
import {Dashboard} from "./src/screens";

const App = () => {
    const isDarkMode = useColorScheme() === 'dark';

    return (
        <NavigationContainer>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'}/>
            <SafeAreaView style={{flex: 1}}>
                <Dashboard />
            </SafeAreaView>
        </NavigationContainer>
    );
};

export default App;
