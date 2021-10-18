import React, { useEffect, useState } from "react"
import { useDispatch,useSelector } from "react-redux"
import { ScrollView, Text, TextInput, StyleSheet, Button } from "react-native"
import * as Location from 'expo-location'
import * as ImagePicker from 'expo-image-picker'
import Upload from "../components/Upload"
import { actionCreate } from '../stores/actions/actionDonation'

export default function Create() {
    const dispatch = useDispatch()
    const [payload, setPayload] = useState({})
    const [localUri, setLocalUri] = useState(null)
    const [filename, setFilename] = useState(null)
    const [type, setType] = useState(null)

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setPayload({ ...payload, lat: location.coords.latitude, long: location.coords.longitude });
        })();
    }, []);

    function submit() {
        let formData = new FormData();
        // Assume "photo" is the name of the form field the server expects
        formData.append('image', { uri: localUri, name: filename, type });
        formData.append('title', { uri: localUri, name: filename, type });
        formData.append('description', { uri: localUri, name: filename, type });
    }

    function getImage(image){
        setPayload({...payload, imgUrl : image})
    }

    async function PickImage() {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4,3],
          quality: 1
        })
        console.log(result)
        if(!result.cancelled){
          setLocalUri(result.uri)
          setFilename(localUri.split('/').pop())
          let getType = match ? `image/${match[1]}` : `image`;
          setType(getType)
        }
    }

    return (
        <ScrollView>
            <Text>{JSON.stringify(payload)}</Text>
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
            <Text style={styles.text}>Balance</Text>
            <TextInput style={styles.input}
                onChangeText={(text) => setPayload({ ...payload, balance: text })}
                name="balance"
                placeholder="Balance" />
            <Button title="Choose Image" onPress={PickImage}/>
            <Button
                title="Submit"
                onPress={() => sendData()}
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