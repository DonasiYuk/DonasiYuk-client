import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { ScrollView, Text, TextInput, StyleSheet, Button, Image, Pressable, KeyboardAvoidingView } from "react-native"
import {  editDonation } from '../stores/actions/actionDonation'

export default function Edit({ route, navigation }) {
    const itemData = route.params.itemData;
    const dispatch = useDispatch()
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
                navigation.goBack()
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
        <ScrollView contentContainerStyle={styles.container}>
            <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={100} >
                <Image resizeMode='cover' style={styles.pic} source={image !== '' ? { uri: image } : null}/>
                {/* <Upload
                    style={styles.btn}
                    sendData={getImage}
                /> */}
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
                <Pressable style={styles.btn} onPress={() => sendData()}>
                    <Text style={styles.btnText}>SUBMIT</Text>
                </Pressable>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#F5F5F5'
    },
    input: {
        padding : 10,
        marginBottom: 20,
        borderWidth: 1,
        borderRadius:20,
        borderColor: '#fff',
        width: 300,
        textAlign:'center',
        backgroundColor:'#fff'
    },
    text:{
        textAlign:"center",
        padding: 10,
        fontWeight:'bold'
    },
    pic:{
        width:300,
        height:200,
        borderRadius:10
    },
    btn:{
        borderWidth:1,
        borderRadius:30,
        borderColor: '#3DB2FF',
        height:40,
        width:300,
        backgroundColor: '#3DB2FF'
    },
    btnText:{
        color:'#fff',
        textAlign:'center',
        marginTop:8
    }
});