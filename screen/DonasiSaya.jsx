import React, { useState, useEffect } from "react";
import {
    FlatList,
    View,
    StyleSheet,
    Text,
    Modal,
    Pressable,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { fetchUserDonations } from "../stores/actions/actionDonasiSaya";

export default function DonasiSaya({ navigation }) {
    const dispatch = useDispatch();

    const [modalVisible, setModalVisible] = useState(false);
    const [donationId, setDonationId] = useState(null);
    const access_token = useSelector(state => state.access_token);
    const userDonations = useSelector(state => state.userDonations);

    useEffect(() => {
        dispatch(fetchUserDonations(access_token))
    }, [dispatch])

    function withdraw() {
        axios({
            url: `http://10.0.2.2:3000/withdraw/${donationId}`,
            method: 'put',
            headers: { access_token }
        })
            .then(res => {
                // console.log(res.data);
            })
            .catch(err => console.log(err))
    }

    return (
        <View style={styles.container}>
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
                        <Text style={styles.modalText}>Beneran mau withdraw nih??? {donationId}</Text>
                        <View style={{ flexDirection: "row" }}>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.textStyle}>gajadi</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={async () => {
                                    withdraw()
                                    dispatch(fetchUserDonations(access_token))
                                    setModalVisible(!modalVisible)
                                }}
                            >
                                <Text style={styles.textStyle}>jadiin lah</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>

            <StatusBar style="auto" />
            <FlatList 
                data={userDonations}
                renderItem={({ item }) => (  
                    <View style={styles.card}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={{ marginBottom: 10 }}>{item.User.username}</Text>
                        <Text style={{ textAlign: "left" }}>Terkumpul</Text>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ textAlign: "left", fontWeight: "bold" }}>
                                Rp.{item.balance},00 
                            </Text>
                            <Text style={{ marginLeft: "auto" }}>{item.status}</Text>
                        </View>
                        {
                            item.status === 'incomplete' ? <Pressable
                                style={[styles.button, styles.buttonOpen]}
                                onPress={() => {
                                    setDonationId(1)
                                    setModalVisible(true)
                                }}
                            >
                                <Text style={styles.textStyle}>Withdraw</Text>
                            </Pressable> : <Pressable
                                style={[styles.button, styles.buttonOpen]}
                                onPress={()=> navigation.navigate('ReportForm', {donationId: item.id})}
                            >
                                <Text style={styles.textStyle}>Send Report</Text>
                            </Pressable>
                        }
                keyExtractor={item => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#fff",
        //   justifyContent: 'center',
    },
    card: {
        padding: 10,
        flexDirection: "column",
        // alignItems: 'center',
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 10,
        height: 170,
        width: 350,
        borderRadius: 10,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    title: {
        marginBottom: 10,
        fontWeight: "bold",
        fontSize: 20,
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
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
    },
});
