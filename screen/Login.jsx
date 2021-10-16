import React, { useState } from "react";
import { TextInput, View, Text, Pressable, StyleSheet } from 'react-native'
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
        .then((res)=>{
            dispatch(setLogin(res.data.access_token))
            navigation.navigate('Register')
        })
        .catch((err)=>{
            console.log(err.message);
        })

    }


    return (
        <View style={styles.container}>
            <Text>email</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeEmail}
                value={email}
                placeholder="email"
            />
            <Text>password</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangePassword}
                value={password}
                placeholder="password"
                secureTextEntry={true}
            />
            <Pressable onPress={loginBtn}>
                <Text>Login</Text>
            </Pressable>
            <Pressable onPress={()=> navigation.navigate('Register')}>
                <Text>Sign Up</Text>
            </Pressable>
        </View>
    );



}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        margin: 12,
        borderBottomWidth: 1,
        padding: 10,
    },
});