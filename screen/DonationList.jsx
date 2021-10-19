import React, { useEffect } from "react";
import { View, StyleSheet, Image, SafeAreaView, FlatList, Text, Pressable, TouchableOpacity } from 'react-native'
import { SearchBar } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux'
import { setDonationsAsync } from '../stores/actions/actionDonation'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import DonasiSaya from "./DonasiSaya";
import Create from "./Create";

function DonationList({ navigation }) {
    const dispatch = useDispatch()
    const donations = useSelector(state => state.donations)


    useEffect(() => {
        dispatch(setDonationsAsync())
    }, [dispatch])


    return (
        <SafeAreaView style={styles.container}>
            <View >
                <SearchBar
                    inputContainerStyle={styles.searchbar}
                    placeholder="type Here ..." />
            </View>
            <FlatList
                data={donations}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('Detail', {
                            itemData: item
                        })
                    }}>

                        <View style={styles.card}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={{ textAlign: "left" }}>Terkumpul</Text>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ textAlign: "left", fontWeight: "bold" }}>
                                    Rp.{item.balance},00
                                </Text>
                                <Text style={{ marginLeft: "auto" }}>{item.status}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    )
}


export default function HomePage() {
    const Tab = createBottomTabNavigator()
    return(
        <Tab.Navigator
            screenOptions={{
                // showLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 25,
                    left: 20,
                    right: 20,
                    elevation: 0,
                    backgroundColor: '#3DB2FF',
                    borderRadius: 20,
                    height: 90,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 5,
                },
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: 'black',
            }}
        >
            <Tab.Screen name="Donations" 
                component={DonationList} 
                options={{ headerStyle: { backgroundColor: '#3DB2FF' }, headerTitleStyle: { color: 'white' }}} 
            />
            <Tab.Screen name="Donasi Saya" component={DonasiSaya} options={{ headerStyle: { backgroundColor: '#3DB2FF' }, headerTitleStyle: { color: 'white' }}} />
            <Tab.Screen name="Create" component={Create} options={{ headerStyle: { backgroundColor: '#3DB2FF' }, headerTitleStyle: { color: 'white' }}} />
        </Tab.Navigator>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchbar: {
        borderRadius: 30
    },
    card: {
        padding: 10,
        flexDirection: "column",
        // alignItems: 'center',
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 10,
        height: 170,
        width: 350,
        borderRadius: 10,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    title: {
        marginBottom: 10,
        fontWeight: "bold",
        fontSize: 20,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        margin: 10,
        borderRadius: 10,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
    },
});