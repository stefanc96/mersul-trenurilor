import {TrainType} from "../../../../interfaces";
import {ColorValue} from "react-native";

export const getTrainColorByType = (type: TrainType): ColorValue => {
    switch (type) {
        case TrainType.Regio:
            return 'dodgerblue'
        case TrainType.InterRegio:
            return 'crimson'
        case TrainType.RegioExpress:
            return 'darkorange'
        case TrainType.InterCity:
            return 'forestgreen'
        case TrainType.EuroNight:
            return 'cornflowerblue'
        case TrainType.InterRegioNight:
            return 'darkviolet'
        case TrainType.International:
            return 'mediumpurple'
        default:
            return 'aqua'
    }
}
