import React, { useEffect, useState } from "react";
import { TextInput, View, Text, Pressable, StyleSheet, Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { actionLogin, setLogin } from '../stores/actions/actionLogin'


export default function Login({ navigation }) {
    const dispatch = useDispatch()
    const [email, onChangeEmail] = useState("")
    const [password, onChangePassword] = useState("")

    function loginBtn() {

        dispatch(actionLogin({
            email,
            password
        }))
        .then((res) => {
            dispatch(setLogin(res.data.access_token))
            navigation.navigate('HomePage')
            navigation.reset({
                index: 0,
                routes: [
                    { name: 'HomePage' },
                ],
            })// prevent back
        })
        .catch((err)=>{
            console.log(err.message);
        })

    }


    return (
        <View style={styles.container}>
            <View>
                <Image style={styles.picture} source={require('../assets/4851046.jpg')}/>
            </View>
            <View style={styles.inputContainer}>

            <Text>Email</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeEmail}
                value={email}
                placeholder="email"
            />
            <Text>Password</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangePassword}
                value={password}
                placeholder="password"
                secureTextEntry={true}
            />
            <Pressable style={styles.signIn} onPress={loginBtn}>
                <Text style={styles.textBtn}>Sign In</Text>
            </Pressable>
            <View style={styles.regisContainer}>
            <Text>Don't have Account?</Text>
            <Pressable style={styles.regisBtn} onPress={()=> navigation.navigate('Register')}>
                <Text style={styles.regisText}>Sign Up</Text>
            </Pressable>
            </View>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3DB2FF',
        alignItems:'center'
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderRadius:30,
        borderColor:'#fff',
        padding: 10,
        width:300,
        textAlign:'center',
        backgroundColor:'#fff'
    },
    picture:{
        width:400,
        height:350,
        
    },
    inputContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: '#F5F5F5',
        borderTopEndRadius: 80,
        borderTopLeftRadius: 80,
        width:400
    },
    signIn:{
        borderWidth:1,
        borderRadius:30,
        width:300,
        height:40,
        backgroundColor: '#3DB2FF',
        borderColor:'#3DB2FF'
    },
    textBtn:{
        textAlign:'center',
        marginTop: 9,
        fontSize:15,
        fontWeight:'bold',
        color:'#fff'
    },
    regisContainer:{
        flexDirection:'row',
        marginTop: 5
    },
    regisBtn:{
        marginLeft:5,
    },
    regisText:{
        color:'#3DB2FF'
    }
});