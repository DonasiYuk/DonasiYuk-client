import React, { useState } from "react"
import { useDispatch,useSelector } from "react-redux"
import { ScrollView, Text, TextInput, StyleSheet, Button, Image, Pressable } from "react-native"
import Upload from "../components/Upload"
import { actionCreate } from '../stores/actions/actionDonation'

export default function Edit() {
    const dispatch = useDispatch()
    const [payload, setPayload] = useState({})

    function sendData(data) {
        dispatch(actionCreate(data))
    }

    function getImage(image){
        setPayload({...payload, imgUrl : image})
    }


    return (
        <ScrollView>
            <Image resizeMode='cover' style={styles.pic} source={require('../assets/register.jpg')}/>
            {/* <Upload
                style={styles.btn}
                sendData={getImage}
            /> */}
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
            <Pressable style={styles.btn} onPress={() => sendData(payload)}>
                <Text style={styles.btnText}>SUBMIT</Text>
            </Pressable>
            
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#F5F5F5'
    },
    input: {
        padding : 10,
        marginBottom: 20,
        marginLeft:46,
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
        marginLeft:45,
        borderRadius:10
    },
    btn:{
        borderWidth:1,
        borderRadius:30,
        borderColor: '#3DB2FF',
        height:40,
        width:300,
        marginLeft:45,
        backgroundColor: '#3DB2FF'
    },
    btnText:{
        color:'#fff',
        textAlign:'center',
        marginTop:8
    }
});