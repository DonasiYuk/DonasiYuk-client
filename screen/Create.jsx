import React, { useState } from "react"
import { useDispatch,useSelector } from "react-redux"
import { ScrollView, Text, TextInput, StyleSheet, Button } from "react-native"
import Upload from "../components/Upload"
import { actionCreate } from '../stores/actions/actionDonation'

export default function Create() {
    const test = useSelector(state => state)
    const dispatch = useDispatch()
    const [payload, setPayload] = useState({})

    function sendData(data) {
        dispatch(actionCreate(data))
    }

    return (
        <ScrollView>
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
            <TextInput style={styles.input}
                onChangeText={(text) => setPayload({ ...payload, targetAmount: text })}
                name="targetAmount"
                placeholder="Target Amount" />
            <Text style={styles.text}>LAT LONG MAP</Text>
            <TextInput style={styles.input}
                onChangeText={(text) => setPayload({ ...payload, latlong: text })}
                name="latlong"
                placeholder="LAT LONG MAP" />
            <Text style={styles.text}>Balance</Text>
            <TextInput style={styles.input}
                onChangeText={(text) => setPayload({ ...payload, balance: text })}
                name="balance"
                placeholder="Balance" />
            <Upload/>
            <Button
                title="Submit"
                onPress={() => sendData(payload)}
            />
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        padding : 10,
        marginBottom: 20,
        borderWidth: 1,

    },
    text:{
        textAlign:"center",
        padding: 10,
        fontWeight:'bold'
    }
});