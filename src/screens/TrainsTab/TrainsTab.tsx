import React, {useState} from 'react'
import {View} from "react-native";
import {TrainListItem} from "./components";
import {ScreenEnum, Station, Stop, Train} from "../../interfaces";
import {deburr} from 'lodash'
import {StackActions} from "@react-navigation/native";
import {Button, Icon, Input, Layout, List, Text} from "@ui-kitten/components";
import {MEDIUM_SIZE, SMALL_SIZE} from "../../theme";

const mersulTrenurilor = require('../../../mersul-trenurilor.json');
const stations: Station[] = mersulTrenurilor.cfr.stations

const compareTrain = (trainFirst: Train, trainSecond: Train) => {
    if (trainFirst.route.stops[0].oraP > trainSecond.route.stops[0].oraP) {
        return 1
    } else if (trainFirst.route.stops[0].oraP < trainSecond.route.stops[0].oraP) {
        return -1
    }
    return 0
}
const initialTrains: Train[] = mersulTrenurilor.cfr.trains

const processStationName = (stationName: string): string => {
    return deburr(stationName).toLowerCase()
}

export const TrainsTab = ({navigation}: { navigation: any }) => {
    const [trains, setTrains] = useState(initialTrains.sort(compareTrain))
    const [searchFromStation, setSearchFromStation] = useState('');
    const [searchToStation, setSearchToStation] = useState('');


    const onSearchFromStation = (inputValue: string) => {
        const searchedValue = processStationName(inputValue)

        const searchedStations = initialTrains.filter(train => {
            const leavingStationName = processStationName(train.route.stops[0].denStaOrigine)

            if (searchToStation) {
                const destinationStationName = processStationName(train.route.stops[train.route.stops.length - 1].denStaDestinatie)
                const searchToStationProcessed = processStationName(searchToStation)
                if (leavingStationName.includes(searchedValue) && destinationStationName.includes(searchToStationProcessed)) {
                    return train
                }
            } else {
                if (leavingStationName.includes(searchedValue)) {
                    return train
                }
            }
        })
        setSearchFromStation(inputValue)
        setTrains(searchedStations.sort(compareTrain))
    }

    const onSearchToStation = (inputValue: string) => {
        const searchedValue = processStationName(inputValue)
        const searchedStations = initialTrains.filter(train => {
            const destinationStationName = processStationName(train.route.stops[train.route.stops.length - 1].denStaDestinatie)

            if (searchFromStation) {
                const leavingStationName = processStationName(train.route.stops[0].denStaOrigine)
                const searchFromStationProcessed = processStationName(searchFromStation)

                if (leavingStationName.includes(searchFromStationProcessed) && destinationStationName.includes(searchedValue)) {
                    return train
                }
            } else {
                if (destinationStationName.includes(searchedValue)) {
                    return train
                }
            }
        })
        setSearchToStation(inputValue)
        setTrains(searchedStations.sort(compareTrain))
    }

    const onPressTrain = (info: any) => {
        const {
            statieOrigine,
            statieDestinatie
        }: { statieOrigine: Stop, statieDestinatie: Stop } = info
        const startCoordinates = stations.find(station => station.cod === statieOrigine.codStaOrigine)?.coordinates
        const endCoordinates = stations.find(station => station.cod === statieDestinatie.codStaDest)?.coordinates

        const pushAction = StackActions.push(ScreenEnum.TrainInfo, {coordinates: [startCoordinates, endCoordinates]});

        navigation.dispatch(pushAction);
    }

    const renderTrainListItem = ({item}: { item: Train }) => {
        return <TrainListItem train={item} onPress={onPressTrain}/>
    }

    const trainKeyExtractor = (item: Train, index: number) => `${item.info.numar} - ${index}`

    return (
        <Layout style={{padding: MEDIUM_SIZE}}>
            <View>
                <Input
                    accessoryLeft={() => <Text>De la: </Text>}
                    placeholder={'statie plecare ...'}
                    value={searchFromStation}
                    style={{marginBottom: SMALL_SIZE}}
                    onChangeText={onSearchFromStation}/>
                <Input
                    accessoryLeft={() => <Text>Pana la: </Text>}

                    placeholder={'statie destinatie ...'}
                    value={searchToStation}
                    style={{marginBottom: SMALL_SIZE}}
                    onChangeText={onSearchToStation}/>
                <Button accessoryLeft={() => (
                    <Icon name={'arrowhead-down-outline'} style={{height: 20, width: 20}} fill={'blue'}/>
                )} status={'primary'} style={{
                    position: 'absolute',
                    height: 40,
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 40,
                    borderRadius: 20,
                    top: '25%',
                    right: 0
                }}>
                </Button>
            </View>
            <List data={trains} renderItem={renderTrainListItem} keyExtractor={trainKeyExtractor}/>
        </Layout>

    )
}
