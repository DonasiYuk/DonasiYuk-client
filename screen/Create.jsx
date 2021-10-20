import React, { useEffect, useState } from "react"
import { useDispatch,useSelector } from "react-redux"
import { ScrollView, Text, TextInput, StyleSheet, Button, Image, Pressable, View, TouchableOpacity } from "react-native"
import * as Location from 'expo-location'
import * as ImagePicker from 'expo-image-picker'
import { actionCreate, setDonations } from '../stores/actions/actionDonation'
import Maps from "../components/Maps"

export default function Create({ navigation }) {
    const dispatch = useDispatch()
    const [payload, setPayload] = useState({
        title: "",
        description: "",
        targetAmount: ''
    })
    const [image, setImage] = useState(null)
    const [localUri, setLocalUri] = useState(null)
    const [filename, setFilename] = useState(null)
    const [type, setType] = useState(null)
    const [location, setLocation] = useState({
        lat : 0,
        long : 0
    })
    const donations = useSelector(state => state.donations)

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation({ ...payload, lat: location.coords.latitude, long: location.coords.longitude });
        })();
    }, []);

    function submit() {
        let formData = new FormData();
        // Assume "photo" is the name of the form field the server expects
        formData.append('image', { uri: localUri, name: filename, type });
        formData.append('title', payload.title);
        formData.append('description', payload.description);
        formData.append('targetAmount', payload.targetAmount);
        formData.append('lat', location.lat);
        formData.append('long', location.long);

        dispatch(actionCreate(formData))
            .then((res) => {
                console.log('berhasil');
                dispatch(setDonations(donations.concat(res.data.newDonation)))
                navigation.navigate('Donasi Saya')
                reset()
            })
            .catch(err => console.log(err))
    }

    function reset(){
        setPayload({ ...payload, title: "", description: '', targetAmount: ''})
        setImage(null)
        setLocalUri(null)
        setFilename(null)
        setType(null)
    }

    async function PickImage() {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4,3],
          quality: 1
        })
        if(!result.cancelled){
            setImage(result.uri)
            setLocalUri(result.uri)
            setFilename(result.uri.split('/').pop())
            setType(result.type)
        }
    }

    return (
        <View style={{ backgroundColor: '#fff', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ScrollView style={styles.container}>
                <Text style={styles.text}>Title</Text>
                <TextInput style={styles.input}
                    value={payload.title}
                    onChangeText={(text) => setPayload({ ...payload, title: text })}
                    name="title"
                    placeholder="Title" />
                <Text style={styles.text}>Description</Text>
                <TextInput style={styles.input}
                    value={payload.description}
                    onChangeText={(text) => setPayload({ ...payload, description: text })}
                    name="description"
                    placeholder="Description" />
                <Text style={styles.text}>Target Amount</Text>
                <TextInput style={styles.input}
                    value={payload.targetAmount}
                    keyboardType='numeric'
                    onChangeText={(text) => setPayload({ ...payload, targetAmount: text })}
                    name="targetAmount"
                    placeholder="Target Amount" />
                {image && <Image source={{ uri: image }} style={styles.image} />}
                <Pressable
                    onPress={PickImage}
                    style={styles.btn}
                >
                    <Text style={styles.text}>Choose Image</Text>
                </Pressable>
                <View>
                    <Maps dataLocation={location} />
                </View>
                <Pressable
                    style={styles.submit}
                    onPress={submit}
                >
                    <Text style={styles.text}>Submit</Text>
                </Pressable>
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        padding: 20,
        borderColor: 'black'
    },
    input: {
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        height: 40,
        margin: 12,
        borderRadius:20,
        borderColor:'black',
        width:300,
        textAlign:'center',
        backgroundColor:'#fff'
    },
    text: {
        textAlign: "center",
        // padding: 10,
        marginTop: 5,
        fontWeight: 'bold',
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginVertical: 10,
        marginHorizontal: '20%',
    },
    btn: {
        // backgroundColor: '#3DB2FF',
        // padding: 5,
        // marginVertical: 10,
        margin: 10,
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        backgroundColor: "#3DB2FF",
    },
    submit : {
        margin: 10,
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        backgroundColor: "#3DB2FF",
        marginBottom : 150
    }
});