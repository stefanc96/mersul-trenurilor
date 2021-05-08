import React, {useState} from 'react'
import {FlatList, View} from "react-native";
import {TrainListItem} from "./components";
import {SearchInput} from "../../components/SearchInput/SearchInput";
import {Train} from "../../interfaces";
import {deburr} from 'lodash'

const mersulTrenurilor = require('../../../mersul-trenurilor.json');

const compareTrain = (trainFirst: Train, trainSecond: Train) => {
    if (trainFirst.route.stops[0].oraP > trainSecond.route.stops[0].oraP) {
        return 1
    } else if (trainFirst.route.stops[0].oraP < trainSecond.route.stops[0].oraP) {
        return -1
    }
    return 0
}
const initialTrains: Train[] = mersulTrenurilor.cfr.trains

export const Dashboard = () => {
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
            <FlatList data={trains} renderItem={TrainListItem} keyExtractor={trainKeyExtractor}/>
        </View>
    )
}
