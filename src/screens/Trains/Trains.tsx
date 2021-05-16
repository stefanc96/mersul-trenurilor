import React, {useState} from 'react'
import {FlatList, View} from "react-native";
import {TrainListItem} from "./components";
import {SearchInput} from "../../components";
import {ScreenEnum, Station, Stop, Train} from "../../interfaces";
import {deburr} from 'lodash'
import {StackActions} from "@react-navigation/native";

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

export const Trains = ({navigation}: {navigation: any}) => {
    const [trains, setTrains] = useState(initialTrains.sort(compareTrain))
    const [searchString, setSearchString] = useState('');


    const onSearchStation = (inputValue: string) => {
        const searchedStations = initialTrains.filter(train => {
            const statieOrigine = deburr(train.route.stops[0].denStaOrigine).toLowerCase()
            const statieDestinatie = deburr(train.route.stops[train.route.stops.length - 1].denStaDestinatie).toLowerCase()

            if (statieOrigine.includes(inputValue.toLowerCase()) || statieDestinatie.includes(inputValue.toLowerCase())) {
                return train
            }
        })
        setSearchString(inputValue)
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
        <View style={{padding: 16}}>
            <View>
                <SearchInput
                    placeholder={'Search train ...'}
                    placeholderTextColor={'black'}
                    value={searchString}
                    onChangeText={onSearchStation}
                />
            </View>
            <FlatList data={trains} renderItem={renderTrainListItem} keyExtractor={trainKeyExtractor}/>
        </View>
    )
}
