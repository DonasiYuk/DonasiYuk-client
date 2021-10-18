import React, { useEffect, useState } from "react";
import { Text, ScrollView, Image, View, StyleSheet, Pressable } from "react-native"
import Maps from '../components/Maps'
import { useDispatch, useSelector } from "react-redux";
import { getDetailDonation } from "../stores/actions/actionDonation";

export default function DetailPage({ route, navigation }) {
    const { id } = route.params;

    const detailDonation = useSelector(state => state.detailDonation);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetailDonation(id))
    }, [dispatch])

    return (
        <ScrollView style={styles.containerColumn}>
            <View >
                <Text style={styles.Texttitle}>{detailDonation?.title}</Text>
            </View>
            <View style ={styles.BoxImage}>
                <Image
                    style={styles.Image}
                    source={
                        {
                            uri: detailDonation?.image
                        }
                    }
                />
            </View>
            <View style={styles.containerRow}>
                <View style={styles.BoxStatus}>
                    <Text style={styles.TextStatus}>Target Amount</Text>
                    <Text style={styles.TextStatus}>{detailDonation?.targetAmount}</Text>
                </View>
                <View style={styles.BoxStatus}>
                    <Text style={styles.TextStatus}>Status</Text>
                </View>
            </View>
            <View>
                <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui blanditiis ab ipsum minima dolorum modi accusamus error quibusdam! Inventore esse, perferendis sequi vel expedita non quasi tempore delectus eligendi officia?</Text>
            </View>
            <View>
                <Maps/>
            </View>
            {/* <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={()=> navigation.navigate('')}
            >
                <Text>Donate</Text>
            </Pressable> */}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    containerColumn : {
        flex : 1,
        flexDirection : 'column'
    },
    containerRow : {
        flex : 1,
        flexDirection : 'row',
        paddingHorizontal: "5%",
    },
    Texttitle : {
        textAlign : 'center',
        fontWeight : 'bold',
        fontSize: 36,
        padding : 20
    },
    Image:{
        width : 250,
        height : 150,
    },
    BoxImage : {
        paddingHorizontal: "17.5%",
        paddingBottom : 25
    },
    BoxStatus : {
        width: 150,
        height : 75,
        backgroundColor : 'black',
        fontSize: 20,
        marginHorizontal : 20,
        borderRadius : 10
    },
    TextStatus: {
        color : 'white',
        fontSize : 20,
        textAlign : 'center'
    },
    // button: {
    //     margin: 10,
    //     borderRadius: 10,
    //     padding: 10,
    //     elevation: 2,
    // },
    // buttonOpen: {
    //     backgroundColor: "#F194FF",
    // },
    // textStyle: {
    //     color: "white",
    //     fontWeight: "bold",
    //     textAlign: "center",
    // },
})