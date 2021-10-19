import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ScrollView, Text, TextInput, StyleSheet, Button, Image, TouchableOpacity, View } from "react-native"
import * as Location from 'expo-location'
import * as ImagePicker from 'expo-image-picker'
import Upload from "../components/Upload"
import { actionCreate } from '../stores/actions/actionDonation'
import NumericInput from 'react-native-numeric-input'

export default function Create() {
    const dispatch = useDispatch()
    const [payload, setPayload] = useState({})
    const [image, setImage] = useState(null)
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
        formData.append('title', payload.title);
        formData.append('description', payload.description);
        formData.append('targetAmount', payload.targetAmount);
        formData.append('lat', payload.lat);
        formData.append('long', payload.long);

        dispatch(actionCreate(formData))
            // .then((res) => {
            //     dispatch(setDonations(donations.concat(res.data.newDonation)))
            // })
            // .catch(err => console.log(err))
    }

    function getImage(image) {
        setPayload({ ...payload, imgUrl: image })
    }

    async function PickImage() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        })
        console.log(result)
        if (!result.cancelled) {
            setImage(result.uri)
            setLocalUri(result.uri)
            setFilename(result.uri.split('/').pop())
            setType(result.type)
        }
    }

    return (
        <View>
            <ScrollView style={styles.container}>
                <Text style={styles.text}>Title</Text>
                <TextInput style={styles.input}
                    onChangeText={(text) => setPayload({ ...payload, title: text })}
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
                    onChange={(text) => setPayload({ ...payload, targetAmount: text })}
                    name="targetAmount"
                    placeholder="Target Amount" />
                <Text style={styles.text}>Balance</Text>
                <NumericInput
                    totalWidth={350}
                    totalHeight={50}
                    rounded
                    iconStyle={{ color: 'black' }}
                    upDownButtonsBackgroundColor='#3DB2FF'
                    type='up-down'
                    style={styles.input}
                    onChange={(text) => setPayload({ ...payload, balance: text })}
                    name="balance"
                    placeholder="Balance" />
                {image && <Image source={{ uri: image }} style={styles.image} />}
                <TouchableOpacity
                    onPress={PickImage}
                    style={styles.btn}
                >
                    <Text style={styles.text}>Choose Image</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={submit}
                >
                    <Text style={styles.text}>Submit</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
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