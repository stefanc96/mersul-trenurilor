import React from 'react'
import {FlatList, Text, View} from "react-native";
import {TrainListItem} from "./components";

const mersulTrenurilor = require('../../../mersul-trenurilor.json');

export const Dashboard = () => {
    return (
        <FlatList data={mersulTrenurilor.cfr.trains} renderItem={TrainListItem}/>
    )
}
