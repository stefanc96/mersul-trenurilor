import React from 'react'
import {Text, View} from "react-native";
import {Train} from "../../../../interfaces";
import {convertToHoursAndMinutes} from "../../../../utils";

export const TrainListItem = ({item}: { item: Train }) => {
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
