import React from "react";
import { View } from 'react-native'
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

export default function Maps({ dataLocation }) {

    const getInitialState = () => {
        return {
            region: {
                latitude: Number(dataLocation.lat),
                longitude: Number(dataLocation.long),
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
        };
    }


    return (
        <View>
            <View>
                <MapView
                    style={{
                        width: "100%",
                        height: 250,
                        marginTop: 10,
                        borderRadius: 10
                    }}
                    region={getInitialState().region}
                >
                    <Marker
                        coordinate={{
                            latitude: Number(dataLocation.lat),
                            longitude: Number(dataLocation.long),
                        }}
                    />
                </MapView>
            </View>
        </View>
    )
}