import React, { useEffect, useState } from "react";
import { TextInput, View, Text, Pressable, StyleSheet, Image, KeyboardAvoidingView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { actionLogin, setLogin } from '../stores/actions/actionLogin'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Entypo } from '@expo/vector-icons'



export default function Login({ navigation }) {
    const dispatch = useDispatch()
    const [email, onChangeEmail] = useState("")
    const [password, onChangePassword] = useState("")
    let [secure, setSecure] = useState({
        icon:'eye-with-line',
        text: true
    })

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
            .catch((err) => {
                console.log(err);
            })

    }

    function updateSecureText() {
        if (secure.text) {
            setSecure({
                icon:'eye',
                text:false
            })
        } else{
            setSecure({
                icon:'eye-with-line',
                text:true
            })
        }
    } 

    return (
        <View style={styles.container}>
            {/* <KeyboardAwareScrollView 
                style={{ backgroundColor: '#3DB2FF' }}
                resetScrollToCoords={{ x: 0, y: 0 }}
                contentContainerStyle={styles.container}
                scrollEnabled={true}
                > */}
                <KeyboardAvoidingView behavior='position' >
            <View>
                <Image style={styles.picture} source={require('../assets/4851046.jpg')} />
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
                <View style={styles.action}>
                <Entypo onPress={updateSecureText} style={styles.icon} name={secure.icon} size={24} color="black" />
                <TextInput
                    style={styles.textInput}
                    onChangeText={onChangePassword}
                    value={password}
                    placeholder="password"
                    secureTextEntry={secure.text}
                // underlineColorAndroid="transparent"
                />
                </View>
                <Pressable style={styles.signIn} onPress={loginBtn}>
                    <Text style={styles.textBtn}>Sign In</Text>
                </Pressable>
                <View style={styles.regisContainer}>
                    <Text>Don't have Account?</Text>
                    <Pressable style={styles.regisBtn} onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.regisText}>Sign Up</Text>
                    </Pressable>
                </View>
            </View>
            </KeyboardAvoidingView>
            {/* </KeyboardAwareScrollView> */}
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3DB2FF',
        alignItems: 'center'
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#fff',
        padding: 10,
        width: 300,
        textAlign: 'center',
        backgroundColor: '#fff'
    },
    picture: {
        width: 400,
        height: 350,

    },
    inputContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5F5F5',
        width: 400
    },
    signIn: {
        borderWidth: 1,
        borderRadius: 30,
        width: 300,
        height: 40,
        backgroundColor: '#3DB2FF',
        borderColor: '#3DB2FF',
        marginTop:10
    },
    textBtn: {
        textAlign: 'center',
        marginTop: 9,
        fontSize: 15,
        fontWeight: 'bold',
        color: '#fff'
    },
    regisContainer: {
        flexDirection: 'row',
        marginTop: 5
    },
    regisBtn: {
        marginLeft: 5,
    },
    regisText: {
        color: '#3DB2FF'
    },
    action: {
        flexDirection: 'row-reverse',
        marginTop: 10,
        paddingBottom: 5,
        borderWidth:1,
        borderRadius:30,
        borderColor:'#fff',
        backgroundColor: '#fff',
        width:300
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : 5,
        color: '#05375a',
        paddingLeft:120,
        
    },
    icon:{
        marginTop:10
    }

});