import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native"

export default function Register() {
    const dispatch = useDispatch()
    const [username, onChangeUsername] = useState("")
    const [email, onChangeEmail] = useState("")
    const [password, onChangePassword] = useState("")
    const [phoneNumber, onChangePhoneNumber] = useState("")
    const [address, onChangeAddress] = useState("")

    return (
        <View>
            <Text>Username</Text>
            <TextInput style={styles.input}
                onChangeText={onChangeUsername}
                value={username}
                placeholder="username" />
            <Text>Email</Text>
            <TextInput style={styles.input} 
            onChangeText={onChangeEmail}
                value={email}
                placeholder="email" />
            <Text>Password</Text>
            <TextInput style={styles.input} 
            onChangeText={onChangePassword}
                value={password}
                placeholder="password" />
            <Text>Phone Number</Text>
            <TextInput style={styles.input} 
            onChangeText={onChangePhoneNumber}
                value={phoneNumber}
                placeholder="phone number" />
            <Text>Address</Text>
            <TextInput style={styles.input} 
            onChangeText={onChangeAddress}
                value={address}
                placeholder="address" />
            <Pressable style={styles.submitBtn}>
                <Text>Submit</Text>
            </Pressable>
        </View>
    )
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
        borderWidth: 1,
        padding: 10,
        borderRadius: 10
    },
    submitBtn: {
        borderWidth: 1,
        borderRadius: 30
    }
});