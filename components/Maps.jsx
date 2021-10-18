import React, { useEffect, useState } from "react";
import { View } from 'react-native'
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { useSelector } from "react-redux";
import * as Location from 'expo-location';

export default function Maps() {
    const detailDonation = useSelector(state => state.detailDonation)
    // const [dataMaps, setDataMaps] = useState()

    // const [location, setLocation] = useState(null);
    // // console.log(location);
    // useEffect(() => {
    //     (async () => {
    //         let { status } = await Location.requestForegroundPermissionsAsync();
    //         if (status !== 'granted') {
    //         setErrorMsg('Permission to access location was denied');
    //         return;
    //         }

    //         let location = await Location.getCurrentPositionAsync({});
    //         setLocation(location);
    //     })();
    // }, []);
    // console.log(detailDonation);
    const getInitialState = () => {
        return {
            region: {
                latitude: detailDonation.lat,
                longitude: detailDonation.long,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
        };
    }

    const onRegionChange = (region) => {
        // region ==>> Get location
        /**
         * latitude: -0.789287,
                longitude: 119.869477,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
         */
    }

    function onMarkerPress(i) {
        console.log('masuk', i)
    }

    /**
     * Explore mmenggunakan toucscreen untuk mendapat data region
     */

    return (
        <View>
            <View>
                <MapView
                    style={{
                        width: "100%",
                        height: 300
                    }}
                    region={getInitialState().region}
                    // onRegionChange={onRegionChange}
                >
                    <Marker
                        coordinate={{
                            latitude: detailDonation.lat,
                            longitude: detailDonation.long,
                        }}
                    />
                </MapView>

            </View>
        </View>
    )
}