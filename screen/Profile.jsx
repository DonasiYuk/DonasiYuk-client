import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, SafeAreaView, Text, View, Platform, Button, Image, ImageBackground, Pressable} from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile } from '../stores/actions/actionProfile'
import { setLogin } from '../stores/actions/actionLogin'
import { FontAwesome, MaterialIcons, Feather } from '@expo/vector-icons';

export default function Profile({navigation}) {
    const access_token = useSelector((state) => state.access_token)
    const user = useSelector((state) => state.userProfile)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserProfile(access_token)) 
    }, [])
    
    function logout(){
        console.log('logout')
        dispatch(setLogin(""))
        navigation.navigate('Login')
    }

    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.card}>
            <View style={styles.topCard}>
                <ImageBackground source={{uri:'https://wallpaperaccess.com/full/1385507.jpg'}} 
                style={{
                    flex: 1,
                    margin: 0,
                    flexDirection: 'column',
                    width: 315,
                    height: 250,
                    justifyContent: 'center',
                    alignItems : 'center',
                    borderRadius: 10,
                    opacity: 50
                }}>
                
                <Image source={{uri:'https://www.pngkey.com/png/detail/157-1575183_aang-png-pic-avatar-the-legend-of-aang.png'}} 
                style={styles.avatar}/>
                <Text style={styles.name}>{user?.username}</Text>
                <Text style={styles.address}><FontAwesome name="map-marker" size={24} color="white" /> {user?.address}</Text>
                </ImageBackground>
            </View>
           {
               user.phoneNumber ? <Text style={styles.phoneNumber}><Feather name="phone-call" size={24} color="blue" /> {user?.phoneNumber}</Text> 
               : <Text style={styles.phoneNumber}><Feather name="phone-call" size={24} color="blue" /> Phone Unregistered</Text>
           } 
           
          <Text style={styles.email}><MaterialIcons name="email" size={24} color="blue" /> {user?.email}</Text> 
          <Pressable style={styles.logout} onPress={logout}>
                <Text style={styles.textBtn}>Log Out</Text>
            </Pressable>
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
        padding: 0,
        marginTop: 0,
        height: 570,
        width: 320,
        alignItems: 'center',
        borderRadius: 20,
        borderColor: 'white',
        borderWidth: 3
      },
      topCard:{
        flexDirection: 'column',
        backgroundColor: 'whitesmoke',
        padding: 0,
        marginTop: 0,
        height: 250,
        width: 320,
        alignItems: 'center',
        borderRadius: 20,
        borderColor: 'white',
        borderWidth: 3
      },
      avatar:{
        width:150,
        height:150,
        borderColor: 'green',
        marginTop: 10,
        borderWidth:5,
        borderRadius: 75
      },
      name:{
        color: "whitesmoke",
        fontSize: 35,
        fontWeight: "bold"
      },
      address:{
        color: "whitesmoke",
        fontSize: 18
      },
      phoneNumber:{
        marginTop: 30,
        color: "black",
        fontSize: 24,
        fontWeight: "bold"
      },
      email: {
        marginTop: 30,
        color: "black",
        fontSize: 24,
        fontWeight: "bold"
      },
      logout:{
        borderWidth:1,
        borderRadius:30,
        width:300,
        height:40,
        marginTop: 140,
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
});