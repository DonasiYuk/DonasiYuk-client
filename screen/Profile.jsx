import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, SafeAreaView, Text, View, Platform, Button, Image} from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile } from '../stores/actions/actionProfile'

export default function Profile({navigation}) {
    const access_token = useSelector((state) => state.access_token)
    const user = useSelector((state) => state.userProfile)
    const test = [user]
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserProfile(access_token)) 
    }, [])
    
    

    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.card}>
          <Text>Open up App.js to start working on your app!</Text>
          <Image source={{uri:'https://www.pngkey.com/png/detail/157-1575183_aang-png-pic-avatar-the-legend-of-aang.png'}} 
          style={styles.avatar}/>
          <Text>{user.username}</Text>
          <Text>{user.address}</Text>
          <Text>{user.phoneNumber}</Text> 
          <Text>{user.email}</Text> 
          
          <StatusBar style="auto" />
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
        borderColor: 'purple',
        borderWidth: 3
      },
      avatar:{
        width:200,
        height:200,
        borderColor: 'green',
        margin: 10,
        borderWidth:5,
        borderRadius: 25
      },
      name:{
    
      },
      address:{
    
      },
      phoneNumber:{
    
      },
      email: {
        
      }
});