import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { View, Text, TextInput, Pressable, StyleSheet, Image, KeyboardAvoidingView } from "react-native"
import { register } from '../stores/actions/actionRegister'

export default function Register({navigation}) {
    const dispatch = useDispatch()
    const [username, onChangeUsername] = useState("")
    const [email, onChangeEmail] = useState("")
    const [password, onChangePassword] = useState("")
    const [phoneNumber, onChangePhoneNumber] = useState("")
    const [address, onChangeAddress] = useState("")

    function registerBtn() {
        dispatch(register({
            username,
            email,
            password,
            phoneNumber,
            address
        }))
        .then(()=>{
            navigation.navigate('Login')
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior='position' >
            <View style={styles.topContainer}>
                <Image style={styles.img} source={require('../assets/register.jpg')}/>
            </View>
            <View style={styles.bottomContainer}>

            <Text style={styles.textregis}>Username</Text>
            <TextInput style={styles.input}
                onChangeText={onChangeUsername}
                value={username}
                placeholder="username" />
            <Text style={styles.textregisBottom}v>Email</Text>
            <TextInput style={styles.input}
                onChangeText={onChangeEmail}
                value={email}
                placeholder="email" />
            <Text style={styles.textregisBottom}>Password</Text>
            <TextInput style={styles.input}
                onChangeText={onChangePassword}
                value={password}
                placeholder="password" />
            <Text style={styles.textregisBottom}>Phone Number</Text>
            <TextInput style={styles.input}
                onChangeText={onChangePhoneNumber}
                value={phoneNumber}
                placeholder="phone number" />
            <Text style={styles.textregisBottom}>Address</Text>
            <TextInput style={styles.input}
                onChangeText={onChangeAddress}
                value={address}
                placeholder="address" />
            <Pressable style={styles.submitBtn} onPress={registerBtn}>
                <Text style={styles.btnText}>Submit</Text>
            </Pressable>
            </View>
            </KeyboardAvoidingView>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3DB2FF',
        alignItems:'center'
    },
    topContainer:{
        flex:0.3
    },
    bottomContainer:{
        flex:1,
        borderWidth:1,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        width:395,
        backgroundColor:'#F5F5F5',
        borderColor:'#F5F5F5'
       
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        borderColor:'#fff'
    },
    submitBtn: {
        borderWidth: 1,
        borderRadius: 30,
        height: 34,
        width: 350,
        marginLeft:23,
        backgroundColor:'#3DB2FF',
        borderColor:'#3DB2FF',
        marginTop:5,
    },
    btnText:{
        textAlign:'center',
        color:'#fff',
        marginTop:5,
        fontSize:15
    },
    textregis:{
        marginLeft: 15,
        marginTop: 20
    },
    textregisBottom:{
        marginLeft: 15,
    },
    img:{
        width:400,
        height:200
    }
});