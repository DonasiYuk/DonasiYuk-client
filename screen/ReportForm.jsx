import React, { useState, useEffect } from "react";
import { TextInput, View, Text, SafeAreaView, StyleSheet, Pressable, Platform, Button, Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import * as ImagePicker from 'expo-image-picker'
import Constants  from 'expo-constants';
import { report } from '../stores/actions/actionReport'

export default function Report({navigation, route}) {
    const donationId = route.params.donationId
    const dispatch = useDispatch()
    const [description, setDescription] = useState("")
    const [image, setImage] = useState(null)
    const [localUri, setLocalUri] = useState(null)
    const [filename, setFilename] = useState(null)
    const [type, setType] = useState(null)

    const access_token = useSelector((state) => state.access_token)

    async function imgAccess(){
        if(Platform.OS !== 'web'){
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
            if( status !== 'granted'){
              alert('Yahhh gaboleh :{(')
            }
          }
    }

    useEffect(() => {
        imgAccess()    
    }, [])
    
    async function PickImage() {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4,3],
        quality: 1
      })
      console.log(result)
      if(!result.cancelled){
        setImage(result.uri)
        setLocalUri(result.uri)
        setFilename(result.uri.split('/').pop())
        setType(result.type)
      }
    }

    function submitReport() {
        let formData = new FormData();
        // Assume "photo" is the name of the form field the server expects
        formData.append('image', { uri: localUri, name: filename, type });
        formData.append('description', description);
        formData.append('donationId', donationId);
        dispatch(report(formData, access_token))
        .then((res)=>{
            navigation.navigate('DonasiSaya')
        })
        .catch((err)=>{
            console.log(err, '??????????')
        })

    }

    return (
      
        <SafeAreaView style={styles.container}>
            <View style={styles.card}>
            <Text style={styles.formName}>Report Form</Text>
            <Text>Description</Text>
            <TextInput
                style={styles.input}
                onChangeText={setDescription}
                value={description}
                placeholder="description"
            />
            {image && <Image source={{uri:image}} style={{
                    width:200,
                    height:200,
                    borderRadius: 10,
                    marginVertical: 10
                }}/>}
            <Button title="Choose Image" onPress={PickImage}/>
            <Pressable
                    style={styles.button}
                    onPress={submitReport}
                >
                    <Text style={styles.buttonText}>Submit Report</Text>
            </Pressable>
            
            
            </View>
      </SafeAreaView>   
    );



}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        flexDirection: 'column',
        backgroundColor: 'whitesmoke',
        padding: 10,
        marginTop: 0,
        height: 570,
        width: 320,
        alignItems: 'center',
        borderRadius: 20
        // justifyContent: 'center',
    },
    formName:{
        fontSize: 40,
        fontWeight: "bold",
    },
    input: {
        height: 40,
        margin: 12,
        borderBottomWidth: 1,
        padding: 5,
        color: 'black'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        marginTop:10,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#F194FF',
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    }
});