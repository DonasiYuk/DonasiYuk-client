import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, SafeAreaView, Text, View, Platform, Button, Image, ImageBackground, Pressable} from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile } from '../stores/actions/actionProfile'
import { setLogin } from '../stores/actions/actionLogin'
import { FontAwesome, MaterialIcons, Feather, FontAwesome5 } from '@expo/vector-icons';

export default function Profile({navigation}) {
    const access_token = useSelector((state) => state.access_token)
    const userDonations = useSelector(state => state.userDonations);
    const totalDonation = userDonations.length
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
                    marginTop: 0,
                    flexDirection: 'column',
                    width: 320,
                    height: 280,
                    justifyContent: 'center',
                    alignItems : 'center',
                    borderRadius: 50,
                    opacity: 50,
                }}>
                
                <Image source={{uri:'https://www.pngkey.com/png/detail/157-1575183_aang-png-pic-avatar-the-legend-of-aang.png'}} 
                style={styles.avatar}/>
                <Text style={styles.name}>{user?.username}</Text>
                <Text style={styles.address}><FontAwesome name="map-marker" size={20} color="white" /> {user?.address}</Text>
                <Text style={styles.count}><FontAwesome5 name="coins" size={16} color="white" />  {totalDonation} Donations</Text>
                </ImageBackground>
            </View>
            <View style={styles.titleCard}>
                <Text style={styles.title}>User Contact :</Text>
            </View>
           {
               user.phoneNumber ? <View style={styles.contactCard}>
                <Text><Feather name="phone-call" size={20} color="#0066CC" />    </Text>
                <Text style={styles.phoneNumber}>{user.phoneNumber}</Text>
               </View>
               : 
               <View style={styles.contactCard}>
                <Text><Feather name="phone-call" size={20} color="#0066CC" />    </Text>
                <Text style={styles.phoneNumber}>Phone Unregistered</Text>
               </View>
           } 
           <View style={styles.contactCard}>
                <Text><MaterialIcons name="email" size={20} color="#0066CC" />    </Text>
                <Text style={styles.email}>{user?.email}</Text>
            </View>
           
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
        paddingTop:0
      },
      card: {
        flexDirection: 'column',
        backgroundColor: 'white',
        padding: 0,
        marginTop: 0,
        height: 500,
        width: 320,
        alignItems: 'center',
        borderRadius: 20,
        borderColor: 'white',
        borderWidth: 0,
        shadowColor: "#fff",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        
        elevation: 7,
      },
      topCard:{
        flexDirection: 'column',
        backgroundColor: 'white',
        padding: 0,
        marginTop: 0,
        height: 280,
        width: 320,
        alignItems: 'center',
        borderRadius: 20,
        borderColor: 'white',
        borderWidth: 0
      },
      contactCard:{
        margin: 10,
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 5,
        marginTop: 0,
        height: 30,
        width: 300,
        alignItems: 'center',
        borderRadius: 20,
        borderColor: 'white',
        borderWidth: 3
      },
      titleCard:{
        margin: 5,
        flexDirection: 'row',
        backgroundColor: '#0066CC',
        padding: 5,
        marginTop: 15,
        height: 35,
        width: 300,
        alignItems: 'center',
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
        fontSize: 14
      },
      count:{
        marginTop: 3,
        color: "whitesmoke",
        fontSize: 14
      },
      phoneNumber:{
        color: "black",
        fontSize: 16,
        fontWeight: "700"
      },
      email: {
        color: "black",
        fontSize: 16,
        fontWeight: "700"
      },
      title: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold"
      },
      logout:{
        borderWidth:1,
        borderRadius:30,
        width:150,
        height:40,
        marginTop: 30,
        backgroundColor: '#d9138a',
        borderColor:'#d9138a'
    },
    textBtn:{
        textAlign:'center',
        marginTop: 9,
        fontSize:15,
        fontWeight:'bold',
        color:'#fff'
    },
});