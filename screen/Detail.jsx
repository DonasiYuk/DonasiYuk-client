import React, { useEffect, useState } from "react";
import { Text, ScrollView, Image, View, StyleSheet } from "react-native"
import Maps from '../components/Maps'
import axios from 'axios'

export default function DetailPage() {
    return (
        <ScrollView style={styles.containerColumn}>
            <View >
                <Text style={styles.Texttitle}>Yayan example</Text>
            </View>
            <View style ={styles.BoxImage}>
                <Image
                    style={styles.Image}
                    source={
                        {
                            uri: 'https://jagad.id/wp-content/uploads/2018/06/Pengertian-Yayasan-Syarat-Pendirian-Jenis-Jenis-dan-Tujuan.jpeg'
                        }
                    }
                />
            </View>
            <View style={styles.containerRow}>
                <View style={styles.BoxStatus}>
                    <Text style={styles.TextStatus}>Target Amount</Text>
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
    }
})