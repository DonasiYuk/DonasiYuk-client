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
            navigation.navigate('Donasi Saya')
        })
        .catch((err)=>{
            console.log(err, '??????????')
        })

    }

    return (
      
        <SafeAreaView style={styles.container}>
            <View style={styles.card}>
            <View style={styles.titleCard}>
                <Text style={styles.formName}>Report Form</Text>
            </View>
            
            <Text>Description</Text>
            <TextInput
                style={styles.input}
                onChangeText={setDescription}
                value={description}
                placeholder="Type your simple description here"
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
        borderRadius: 20,
        shadowColor: "#fff",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        
        elevation: 7,
        // justifyContent: 'center',
    },
    formName:{
        fontSize: 35,
        fontWeight: "bold",
        color: 'whitesmoke'
    },
    input: {
        height: 40,
        margin: 5,
        marginTop: 0,
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
        width: 300,
        backgroundColor: '#3DB2FF',
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    titleCard:{
        margin: 5,
        flexDirection: 'row',
        backgroundColor: '#0066CC',
        padding: 5,
        marginTop: 1,
        marginBottom: 20,
        height: 50,
        width: 250,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderColor: '#0066CC',
        borderWidth: 3,
        shadowColor: "#fff",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        
        elevation: 7,
    }
});