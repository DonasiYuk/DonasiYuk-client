import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ScrollView, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native"
import Upload from "../components/Upload"
import { actionCreate } from '../stores/actions/actionDonation'
import NumericInput from 'react-native-numeric-input'

export default function Edit() {
    const dispatch = useDispatch()
    const [payload, setPayload] = useState({})

    function sendData(data) {
        dispatch(actionCreate(data))
    }

    function getImage(image) {
        setPayload({ ...payload, imgUrl: image })
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.text}>Title</Text>
            <TextInput style={styles.input}
                onChangeText={(text) => setPayload({ ...payload, username: text })}
                name="title"
                placeholder="title" />
            <Text style={styles.text}>Description</Text>
            <TextInput style={styles.input}
                onChangeText={(text) => setPayload({ ...payload, description: text })}
                name="description"
                placeholder="description" />
            <Text style={styles.text}>Target Amount</Text>
            <NumericInput
                totalWidth={350}
                totalHeight={50}
                rounded
                iconStyle={{ color: 'black' }}
                upDownButtonsBackgroundColor='#3DB2FF'
                type='up-down'
                style={styles.input}
                onChangeText={(text) => setPayload({ ...payload, targetAmount: text })}
                name="targetAmount"
                placeholder="Target Amount" />
            <Text style={styles.text}>LAT LONG MAP</Text>
            <TextInput style={styles.input}
                onChangeText={(text) => setPayload({ ...payload, latlong: text })}
                name="latlong"
                placeholder="LAT LONG MAP" />
            <Text style={styles.text}>Balance</Text>
            <NumericInput
                totalWidth={350}
                totalHeight={50}
                rounded
                iconStyle={{ color: 'black' }}
                upDownButtonsBackgroundColor='#3DB2FF'
                type='up-down'
                style={styles.input}
                onChangeText={(text) => setPayload({ ...payload, balance: text })}
                name="balance"
                placeholder="Balance" />
            <Upload
                sendData={getImage}
            />
            <TouchableOpacity
                style={styles.btn}
                title="Submit"
                onPress={() => sendData(payload)}
            >
                <Text style={styles.text}>Submit</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        padding: 10,
        marginBottom: 20,
        borderWidth: 1,
        borderRadius: 20
    },
    text: {
        textAlign: "center",
        padding: 10,
        fontWeight: 'bold'
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginVertical: 10,
        marginHorizontal: "22.5%",
    },
    btn: {
        backgroundColor: '#3DB2FF',
        padding: 5,
        marginVertical: 20
    }
});