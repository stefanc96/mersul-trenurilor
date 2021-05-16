import React from 'react'
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

export const TrainInfo = (props: any) => {
    const {coordinates} = props.route.params

    return (
        <MapView
            style={{flex: 1}}
        >
            <MapViewDirections
                origin={{latitude: coordinates[0].lat, longitude: coordinates[0].lon}}
                destination={{latitude: coordinates[1].lat, longitude: coordinates[1].lon}}
                apikey={'AIzaSyDLwnfHcDIgKJSfBIBE77KUWbWHCuWgZ0o'}
                mode={'TRANSIT'}
            />
        </MapView>
    )
}
