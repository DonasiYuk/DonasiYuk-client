import React, { useEffect, useState } from "react";
import { Text, ScrollView, Image, View, StyleSheet, Pressable, Modal, TextInput } from "react-native"
import Maps from '../components/Maps'
import { useDispatch, useSelector } from "react-redux";
import { getDetailDonation } from "../stores/actions/actionDonation";
import { fetchUserDonations } from '../stores/actions/actionDonasiSaya'
import { WebView } from 'react-native-webview'
import axios from "axios";

export default function DetailPage({ route, navigation }) {
    const { id } = route.params;
    const [modalVisible, setModalVisible] = useState(false);
    const detailDonation = useSelector(state => state.detailDonation);
    const access_token = useSelector(state => state.access_token)
    const dispatch = useDispatch();
    const [amount, setAmount] = useState(0)
    const [midtrans, setMidtrans] = useState("")

    useEffect(() => {
        dispatch(getDetailDonation(id))
    }, [dispatch])

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
        <ScrollView style={styles.containerColumn}>
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
                                    payDonation(detailDonation?.id)
                                }}
                            >
                                <Text style={styles.textStyle}>Donate</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
            <View >
                <Text style={styles.Texttitle}>{detailDonation?.title}</Text>
            </View>
            <View style={styles.BoxImage}>
                <Image
                    style={styles.Image}
                    source={
                        {
                            uri: detailDonation?.image
                        }
                    }
                />
            </View>
            <View style={styles.containerRow}>
                <View style={styles.BoxStatus}>
                    <Text style={styles.TextStatus}>Target Amount</Text>
                    <Text style={styles.TextStatus}>{detailDonation?.targetAmount}</Text>
                </View>
                <View style={styles.BoxStatus}>
                    <Text style={styles.TextStatus}>Status</Text>
                </View>
            </View>
            <View>
                <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui blanditiis ab ipsum minima dolorum modi accusamus error quibusdam! Inventore esse, perferendis sequi vel expedita non quasi tempore delectus eligendi officia?</Text>
            </View>
            <View>
                <Maps />
            </View>
            <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(true)}
            >
                <Text>Donate</Text>
            </Pressable>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    containerColumn: {
        flex: 1,
        flexDirection: 'column'
    },
    containerRow: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: "5%",
    },
    Texttitle: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 36,
        padding: 20
    },
    Image: {
        width: 250,
        height: 150,
    },
    BoxImage: {
        paddingHorizontal: "17.5%",
        paddingBottom: 25
    },
    BoxStatus: {
        width: 150,
        height: 75,
        backgroundColor: 'black',
        fontSize: 20,
        marginHorizontal: 20,
        borderRadius: 10
    },
    TextStatus: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        borderWidth: 1
    }, centeredView: {
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
    }, modalText: {
        marginBottom: 15,
        textAlign: "center",
        borderWidth: 1
    },
    // button: {
    //     margin: 10,
    //     borderRadius: 10,
    //     padding: 10,
    //     elevation: 2,
    // },
    // buttonOpen: {
    //     backgroundColor: "#F194FF",
    // },
    // textStyle: {
    //     color: "white",
    //     fontWeight: "bold",
    //     textAlign: "center",
    // },
})