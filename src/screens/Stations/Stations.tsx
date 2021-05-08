import React, {useState} from 'react'
import {FlatList, View} from "react-native";
import {StationListItem} from "./components";
import {Station} from "../../interfaces";
import {SearchInput} from "../../components/SearchInput/SearchInput";
import {deburr} from 'lodash'

const mersulTrenurilor = require('../../../mersul-trenurilor.json');

const compareStation = (stationTo: Station, stationFrom: Station) => {
    if(stationTo.denumire > stationFrom.denumire){
        return 1
    } else if(stationTo.denumire < stationFrom.denumire){
        return -1
    }
    return 0
}
const initialStations: Station[] = mersulTrenurilor.cfr.stations

export const Stations = () => {
    const [stations, setStations] = useState(initialStations.sort(compareStation))
    const [searchString, setSearchString] = useState('');


    const onSearchStation = (inputValue: string) => {
        const searchedStations = initialStations.filter(station => {
            if (deburr(station.denumire).toLowerCase().includes(inputValue.toLowerCase())) {
                return station
            }
        })
        setSearchString(inputValue)
        setStations(searchedStations.sort(compareStation))

    }

    const stationKeyExtractor = (item: Station, index: number) => `${item.cod} - ${index}`

    return (
        <View style={{padding: 16}}>
            <View>
                <SearchInput
                    placeholder={'Search station ...'}
                    placeholderTextColor={'black'}
                    value={searchString}
                    onChangeText={onSearchStation}
                />
            </View>
            <FlatList data={stations} renderItem={StationListItem} keyExtractor={stationKeyExtractor}/>
        </View>
    )
}
