import React from 'react'
import {Text, View} from "react-native";
import {TrainTime} from "../../../../interfaces";
import {convertToHoursAndMinutes, getHoursAndMinutes} from "../../../../utils";
import {TouchableWithoutFeedback} from "react-native-gesture-handler";
import {PropsTrainListItem} from "./TrainListItem.interface";

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

    const onPressTrain = () => {
        onPress({train, statieOrigine, statieDestinatie})
    }

    return (
        <TouchableWithoutFeedback onPress={onPressTrain}>
            <View style={{
                padding: 16, flexDirection: 'row', margin: 8, borderRadius: 8, shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 4,
                },
                backgroundColor: getTrainRideColor(trainRideStatus),
                shadowOpacity: 0.30,
                shadowRadius: 4.65,

                elevation: 8,
            }}>
                <View style={{flex: 0.2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: 'black'}}>{train.info.categorieTren}</Text>
                    <Text style={{color: 'black'}}>{train.info.numar}</Text>
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
        </TouchableWithoutFeedback>
    )
}
