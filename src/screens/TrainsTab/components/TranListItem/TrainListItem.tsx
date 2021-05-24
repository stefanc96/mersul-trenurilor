import React from 'react'
import {View} from "react-native";
import {TrainTime, TrainType} from "../../../../interfaces";
import {convertToHoursAndMinutes, getHoursAndMinutes} from "../../../../utils";
import {TouchableWithoutFeedback} from "react-native-gesture-handler";
import {PropsTrainListItem} from "./TrainListItem.interface";
import {ListItem, Text, useTheme} from "@ui-kitten/components";
import {getTrainColorByType} from "./TrainListItem.utils";

enum TrainRideStatus {
    ReadyToStart,
    InProgress,
    Finished
}

const hasTrainLeft = (hours: number, minutes: number): boolean => {
    const now = new Date();

    if (now.getHours() > hours) {
        return true
    } else if (now.getHours() === hours && now.getMinutes() > minutes) {
        return true
    }
    return false
}

const hasTrainArrived = (leavingTime: TrainTime, arrivingTime: TrainTime): boolean => {
    const now = new Date();

    if(hasTrainLeft(leavingTime.hours, leavingTime.minutes)){
        if (now.getHours() > arrivingTime.hours) {
            return true
        } else if (now.getHours() === arrivingTime.hours && now.getMinutes() > arrivingTime.minutes) {
            return true
        }
    }
    return false
}

const getTrainRideStatus = (leavingTime: TrainTime, arrivingTime: TrainTime) => {
    switch (true){
        case hasTrainArrived(leavingTime, arrivingTime):
            return TrainRideStatus.Finished
        case hasTrainLeft(leavingTime.hours, leavingTime.minutes):
            return TrainRideStatus.InProgress
        default:
            return TrainRideStatus.ReadyToStart
    }
}

const getTrainRideColor = (trainRideStatus: TrainRideStatus) => {
    switch (trainRideStatus) {
        case TrainRideStatus.Finished:
            return 'gray'
        case TrainRideStatus.InProgress:
            return 'yellow'
        default:
        case TrainRideStatus.ReadyToStart:
            return 'green'
    }
}

export const TrainListItem: React.FC<PropsTrainListItem> = (props) => {
    const {
        train,
        onPress
    } = props
    const statieOrigine = train.route.stops[0]
    const statieDestinatie = train.route.stops[train.route.stops.length - 1]
    const leavingTime: TrainTime = getHoursAndMinutes(statieOrigine.oraP)
    const arrivingTime: TrainTime = getHoursAndMinutes(statieDestinatie.oraS)
    const trainRideStatus = getTrainRideStatus(leavingTime, arrivingTime)
    const theme = useTheme()

    const oraP = convertToHoursAndMinutes(statieOrigine.oraP)
    const oraS = convertToHoursAndMinutes(statieDestinatie.oraS)

    const onPressTrain = () => {
        onPress({train, statieOrigine, statieDestinatie})
    }

    const trainColor = getTrainColorByType(train.info.categorieTren as TrainType)

    return (
        <TouchableWithoutFeedback onPress={onPressTrain}>
            <ListItem
                title={`${statieOrigine.denStaOrigine} - ${statieDestinatie.denStaDestinatie}`}
                description={`${oraP} - ${oraS}`}
                accessoryLeft={() => (<View style={{backgroundColor: theme['background-basic-color-2'], justifyContent: 'center', alignItems: 'center', width: 50, height: 50, borderRadius: 25}}>
                    <Text style={{fontSize: 20, fontStyle: 'italic', fontWeight: 'bold', color: trainColor}}>{train.info.categorieTren}</Text>
                </View>)}
            />
        </TouchableWithoutFeedback>
    )
}
