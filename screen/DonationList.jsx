import React, { useEffect } from "react";
import { View, StyleSheet, Image, SafeAreaView, FlatList, Text, Pressable, TouchableOpacity } from 'react-native'
import { SearchBar } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux'
import { setDonationsAsync } from '../stores/actions/actionDonation'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useFocusEffect } from '@react-navigation/native'

import DonasiSaya from "./DonasiSaya";
import Create from "./Create";
import Profile from "./Profile"

function DonationList({ navigation }) {
    const dispatch = useDispatch()
    const donations = useSelector(state => state.donations)

    useFocusEffect(
        React.useCallback(() => {
    
          return dispatch(setDonationsAsync())
        }, [dispatch])
      );

     
    
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={donations}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('Detail', {
                            itemData: item
                        })
                    }}>

                        <View style={styles.card}>
                            <View style={styles.imgContainer}>
                                <Image resizeMode='cover' style={styles.imgCard} source={{uri:item.image}}/>
                            </View>
                            <View style={styles.textContainer}>

                            <Text numberOfLines={1} style={styles.title}>{item.title}</Text>
                            <Text >Terkumpul</Text>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ textAlign: "left", fontWeight: "bold" }}>
                                Rp.{item.balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")},00
                                </Text>
                            </View>
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
                    // height: 50,
                    position: 'absolute',
                    bottom: 15,
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
            <Tab.Screen name="Profile" component={Profile} options={{ headerStyle: { backgroundColor: '#3DB2FF' }, headerTitleStyle: { color: 'white' }}} />
        </Tab.Navigator>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
    },
    seacrhBarContainer:{
        backgroundColor:'#3DB2FF'
    },
    searchbar: {
        borderRadius: 30,
        width:376,
        backgroundColor:'#FFF',
        color:'#3DB2FF'
    },
    imgContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    textContainer:{
        flex:1,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center'
    },
    imgCard:{
        width:150,
        height:150,
        borderRadius:10
    },
    card: {
        padding: 10,
        flexDirection: 'row',
        // alignItems: 'center',
        justifyContent: 'flex-start',
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
        fontSize: 15,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
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
    
});