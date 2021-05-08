import React from 'react'
import {Text, View} from "react-native";
import {Station} from "../../../../interfaces";


export const StationListItem = ({item: station}: { item: Station }) => {

    return (
        <View style={{
            padding: 16, flexDirection: 'row', marginVertical: 8, borderRadius: 8, shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 4,
            },
            backgroundColor: 'white',
            shadowOpacity: 0.30,
            shadowRadius: 4.65,

            elevation: 8,
        }} key={station.cod}>
            <View style={{flex: 0.2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: 'black'}}>{station.cod}</Text>
            </View>
            <View style={{flex: 0.6, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: 'black'}}>{station.denumire}</Text>
            </View>
        </View>
    )
}
