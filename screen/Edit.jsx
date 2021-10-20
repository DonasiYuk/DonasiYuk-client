import React, { useState } from "react"
import { useDispatch,useSelector } from "react-redux"
import { ScrollView, Text, TextInput, StyleSheet, Button } from "react-native"
import Upload from "../components/Upload"
import { actionCreate, editDonation } from '../stores/actions/actionDonation'

export default function Edit({ navigation }) {
    const itemData = route.params.itemData;
    const dispatch = useDispatch()
    const [payload, setPayload] = useState({})
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [targetAmount, setTargetAmount] = useState("")
    const [image, setImage] = useState("")

    useEffect(() => {
        setTitle(itemData.title)
        setDescription(itemData.description)
        setTargetAmount(itemData.targetAmount)
        setImage(itemData.image)
    }, [])

    function sendData() {
        const data = { title, description, targetAmount, lat: itemData.lat, long: itemData.long}
        dispatch(editDonation(data, itemData.id))
            .then(() => {
                navigation.navigate('Donasi Saya')
                reset()
            })
            .catch(console.log())
    }

    function reset() {
        setTitle("")
        setDescription("")
        setTargetAmount("")
    }

    return (
        <ScrollView>
            <Text style={styles.text}>Title</Text>
            <TextInput style={styles.input}
                value={title}
                onChangeText={(text) => setTitle(text)}
                name="title"
                placeholder="title" />
            <Text style={styles.text}>Description</Text>
            <TextInput style={styles.input}
                value={description}
                onChangeText={(text) => setDescription(text)}
                name="description"
                placeholder="description" />
            <Text style={styles.text}>Target Amount</Text>
            <TextInput style={styles.input}
                value={targetAmount}
                keyboardType='numeric'
                onChangeText={(text) => setTargetAmount(text)}
                name="targetAmount"
                placeholder="Target Amount" />
            <Upload
                sendData={getImage}
            />
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