import React,{useState} from "react";
import { Text, Image, View, StyleSheet, Pressable, Dimensions, StatusBar, Modal, TextInput } from "react-native"
import { ImageHeaderScrollView, TriggeringView } from 'react-native-image-header-scroll-view';
import Maps from '../components/Maps';
import { useSelector } from "react-redux";
import { WebView } from 'react-native-webview'
import axios from "axios";

const MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 55;
const MAX_HEIGHT = 350;
const baseUrl = 'http://10.0.2.2:3000'
// const baseUrl = 'http://192.168.1.12:3000'

export default function DetailPage({ route, navigation }) {
    const itemData = route.params.itemData;
    const [modalVisible, setModalVisible] = useState(false);
    const detailDonation = useSelector(state => state.detailDonation);
    const access_token = useSelector(state => state.access_token)
    const [amount, setAmount] = useState(0)
    const [midtrans, setMidtrans] = useState("")


    function payDonation(id) {
        axios({
            url: `${baseUrl}/transactions/${id}`,
            method: 'post',
            headers: { access_token },
            data: { amount }
        })
            .then((res) => {
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
          <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={newStyles.centeredView}>
                    <View style={newStyles.modalView}>
                        <Text>Masukan jumlah donasi yang anda ingin donasikan </Text>
                        <TextInput style={newStyles.modalText} onChangeText={setAmount} value={amount} />
                        <View style={{ flexDirection: "row" }}>
                            <Pressable
                                style={[newStyles.button, newStyles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={newStyles.textStyle}>Cancel</Text>
                            </Pressable>
                            <Pressable
                                style={[newStyles.button, newStyles.buttonClose]}
                                onPress={async () => {
                                    payDonation(itemData?.id)
                                }}
                            >
                                <Text style={newStyles.textStyle}>Donate</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
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
                        <Text style={newStyles.sectionContent}>Rp.{itemData.balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")},00 from Rp.{itemData.targetAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")},00</Text>
                        <Text style={{ color: 'blue'}}>{itemData.User.username}</Text>
                        <Pressable
                            style={[styles.button, styles.buttonOpen]}
                            onPress={()=> setModalVisible(true)}
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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        margin: 10,
        borderRadius: 10,
        padding: 10,
        elevation: 2,
    },
    buttonClose: {
        backgroundColor: "#3DB2FF",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        marginBottom: 10,
        marginTop: 10,
        textAlign: "center",
        borderWidth:1,
        borderRadius:10,
        width:250
    },
});