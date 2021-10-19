import React,{useState} from "react";
import { Text, Image, View, StyleSheet, Pressable, Dimensions, StatusBar, Modal, TextInput } from "react-native"
import { ImageHeaderScrollView, TriggeringView } from 'react-native-image-header-scroll-view';
import Maps from '../components/Maps';
import { useSelector } from "react-redux";
import { WebView } from 'react-native-webview'
import axios from "axios";


const MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 55;
const MAX_HEIGHT = 350;

export default function DetailPage({ route, navigation }) {
    const itemData = route.params.itemData;
    const [modalVisible, setModalVisible] = useState(false);
    const detailDonation = useSelector(state => state.detailDonation);
    const access_token = useSelector(state => state.access_token)
    const [amount, setAmount] = useState(0)
    const [midtrans, setMidtrans] = useState("")

    const [midtrans, setMidtrans] = useState("")

    function payDonation(id) {
      console.log(id);
        axios({
            url: `http://10.0.2.2:3000/transactions/${id}`,
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
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TextInput style={styles.modalText} onChangeText={setAmount} value={amount} />
                        <View style={{ flexDirection: "row" }}>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.textStyle}>Cancel</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={async () => {
                                    payDonation(itemData?.id)
                                }}
                            >
                                <Text style={styles.textStyle}>Donate</Text>
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
                        <Text style={newStyles.sectionContent}>Rp.{itemData.balance},00 from Rp.{itemData.targetAmount},00</Text>
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
});