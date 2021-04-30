/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
    FlatList,
    SafeAreaView,
    StatusBar,
    Text,
    useColorScheme,
    View,
} from 'react-native';

import {NavigationContainer} from "@react-navigation/native";

const mersulTrenurilor = require('./mersul-trenurilor.json');

enum TrainClass {
    Second = '2'
}

enum RouteType {
    Implicit = 'Implicita'
}

enum TrainType {
    Regio = 'R'
}

interface TrainInfo {
    categorieTren: string,
    kmCum: string,
    lungime: string,
    numar: string,
    operator: string,
    proprietar: string,
    putere: string,
    rang: string,
    servicii: TrainClass,
    tonaj: string
}

interface RouteInfo {
    codStatieFinala: string,
    codStatieInitiala: string,
    id: string,
    tip: RouteType
}

interface Station {
    ajustari: string,
    codStaDest: string,
    codStaOrigine: string,
    denStaDestinatie: string,
    denStaOrigine: string,
    km: string,
    lungime: string,
    oraP: string,
    oraS: string,
    rci: TrainType,
    rco: TrainType,
    restrictie: string,
    secventa: string,
    stationareSecunde: string,
    tipOprire: string,
    tonaj: string,
    vitezaLivret: string
}

interface Train {
    info: TrainInfo,
    route: {
        info: RouteInfo,
        stations: Station[]
    }
}

function convertNumberToTimeFormat(value: number) {
    return value < 10 ? "0" + value : value
}

function convertToHoursAndMinutes(value: string) {
    const sec = parseInt(value, 10);
    let hours = Math.floor(sec / 3600);
    let minutes = Math.floor((sec - (hours * 3600)) / 60);

    return convertNumberToTimeFormat(hours) + ':' + convertNumberToTimeFormat(minutes)
}

const App = () => {
    const isDarkMode = useColorScheme() === 'dark';

    const renderItem = ({item}: { item: Train }) => {
        const statieOrigine = item.route.stations[0]
        const statieDestinatie = item.route.stations[item.route.stations.length - 1]
        return (
            <View style={{
                padding: 16, flexDirection: 'row', margin: 8, borderRadius: 8, shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 4,
                },
                backgroundColor: 'white',
                shadowOpacity: 0.30,
                shadowRadius: 4.65,

                elevation: 8,
            }} key={item.info.numar}>
                <View style={{flex: 0.2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: 'black'}}>{item.info.categorieTren}</Text>
                    <Text style={{color: 'black'}}>{item.info.numar}</Text>
                </View>
                <View style={{flex: 0.6, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: 'black'}}>{statieOrigine.denStaOrigine}</Text>
                    <Text style={{color: 'black'}}>{statieDestinatie.denStaDestinatie}</Text>
                </View>
                <View style={{flex: 0.2, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: 'black'}}>{convertToHoursAndMinutes(statieOrigine.oraP)}</Text>
                    <Text style={{color: 'black'}}>{convertToHoursAndMinutes(statieDestinatie.oraS)}</Text>
                </View>
            </View>
        )
    }

    return (
        <NavigationContainer>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'}/>
            <SafeAreaView style={{flex: 1}}>
                <FlatList data={mersulTrenurilor.cfr.trains} renderItem={renderItem}/>
            </SafeAreaView>
        </NavigationContainer>
    );
};

export default App;
