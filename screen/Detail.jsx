import React, { useState } from "react";
import { Text, Image, View, StyleSheet, Pressable, Dimensions, StatusBar } from "react-native"
import { ImageHeaderScrollView, TriggeringView } from 'react-native-image-header-scroll-view';
import Maps from '../components/Maps';

const MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 55;
const MAX_HEIGHT = 350;

export default function DetailPage({ route, navigation }) {
    const itemData = route.params.itemData;

    const [midtrans, setMidtrans] = useState("")

    function payDonation(id) {

        axios({
            url: `http://10.0.2.2:3000/transactions/${id}`,
            method: 'post',
            headers: { access_token },
            data: { amount }
        })
            .then((res) => {
                // console.log(res.data.redirect_url);
                setMidtrans(res.data.redirect_url)
                setModalVisible(false)

            })
            .catch(err => console.log(err))
    }

    if (midtrans) {
        return (<WebView
            style={styles.containerRow}
            source={{ uri: `${midtrans}` }}
        />)
    }

    

    return (
        <View style={newStyles.container}>
            <StatusBar barStyle="light-content" />
            <ImageHeaderScrollView
                maxHeight={MAX_HEIGHT}
                minHeight={MIN_HEIGHT}
                maxOverlayOpacity={0.6}
                minOverlayOpacity={0.3}
                renderHeader={() => (
                  <Image source={{ uri: itemData.image}} style={newStyles.image} />
                )}
            >
                <TriggeringView style={newStyles.section}>
                    <View>
                        <Text style={newStyles.title}>{itemData.title}</Text>
                        <Text style={newStyles.sectionContent}>Rp.{itemData.balance},00 from Rp.{itemData.targetAmount},00</Text>
                        <Text style={{ color: 'blue'}}>{itemData.User.username}</Text>
                        <Pressable
                            style={[styles.button, styles.buttonOpen]}
                            onPress={()=> navigation.navigate('ReportForm')}
                            >
                                <Text style={styles.textStyle}>Donate</Text>
                        </Pressable>
                        <Text style={{ fontWeight: 'bold' }}>{itemData.Transactions.length} Donasi</Text>
                        <Text style={newStyles.sectionContent}>{itemData.description}</Text>
                        <View>
                            <Maps dataLocation={itemData} />
                        </View>
                    </View>
                </TriggeringView>
            </ImageHeaderScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 5,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: "#3DB2FF",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    }
})

const newStyles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      height: MAX_HEIGHT,
      width: Dimensions.get('window').width,
      alignSelf: 'stretch',
      resizeMode: 'cover',
    },
    title: {
      fontSize: 20,
      fontWeight: '500',
      marginBottom: 10
    },
    name: {
      fontWeight: 'bold',
    },
    section: {
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#cccccc',
      backgroundColor: 'white',
    },
    sectionContent: {
      fontSize: 14,
      textAlign: 'justify',
    },
    titleContainer: {
      flex: 1,
      alignSelf: 'stretch',
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageTitle: {
      color: 'white',
      backgroundColor: 'transparent',
      fontSize: 24,
    },
    sectionLarge: {
      minHeight: 300,
    },
});