import React, { useState, useEffect } from "react";
import {
    FlatList,
    View,
    StyleSheet,
    Text,
    Modal,
    Pressable,
    Image
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from '@react-navigation/native'
import axios from 'axios';
import { fetchUserDonations } from "../stores/actions/actionDonasiSaya";

export default function DonasiSaya({ navigation }) {
    const dispatch = useDispatch();

    const [modalVisible, setModalVisible] = useState(false);
    const [donationId, setDonationId] = useState(null);
    const access_token = useSelector(state => state.access_token);
    const userDonations = useSelector(state => state.userDonations);
    const baseUrl = 'http://10.0.2.2:3000'

    useFocusEffect(
        React.useCallback(() => {
          return dispatch(fetchUserDonations(access_token))
        }, [dispatch])
    );


    function withdraw() {
        axios({
            url: `${baseUrl}/withdraw/${donationId}`,
            method: 'put',
            headers: { access_token }
        })
            .then(res => {
                dispatch(fetchUserDonations(access_token))
            })
            .catch(err => console.log(err))
    }

    if (userDonations.length === 0) {
        return (
            <View style={{ ...styles.container, justifyContent: 'center'}}>
                <Text>You don't have any donation</Text>
                <Pressable
                    style={[styles.button, styles.buttonOpen]}
                    onPress={() => {
                        navigation.navigate('Create')
                    }}
                >
                    <Text style={styles.textStyle}>Create Donation</Text>
                </Pressable>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
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
                            <Text numberOfLines={1} style={styles.title}>{item.title}</Text>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ marginBottom: 10 }}>{item.User.username}</Text>
                                <Pressable 
                                    style={{ marginLeft: "auto" }}
                                    onPress={() => {
                                        navigation.navigate('Edit', {
                                            itemData: item
                                        })
                                    }}
                                >
                                    <Text style={{ color: 'blue'}}>Edit</Text>
                                </Pressable>
                            </View>
                            <Text style={{ textAlign: "left" }}>Terkumpul</Text>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ textAlign: "left", fontWeight: "bold" }}>
                                Rp.{item.balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")},00 
                                </Text>
                                <Text style={{ marginLeft: "auto" }}>{item.status}</Text>
                            </View>
                            {
                                item.status !== 'closed' ? <Pressable
                                    style={[styles.button, {backgroundColor: "#d9138a"}]}
                                    onPress={() => {
                                        setDonationId(item.id)
                                        setModalVisible(true)
                                    }}
                                >
                                    <Text style={styles.textStyle}>Withdraw</Text>
                                </Pressable> : <Pressable
                                style={[styles.button, { backgroundColor: '#3DB2FF'}]}
                                onPress={()=> navigation.navigate('ReportForm', {donationId: item.id})}
                                >
                                    <Text style={styles.textStyle}>Send Report</Text>
                                </Pressable>
                            }
                        </View>
                    )}
                    keyExtractor={item => item.id}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        // backgroundColor: "#fff",
        marginBottom: 100
        // padding: 10
        //   justifyContent: 'center',
    },
    card: {
        padding: 10,
        flexDirection: "column",
        // alignItems: 'center',
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 5,
        height: 170,
        width: 350,
        borderRadius: 10,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    title: {
        marginBottom: 10,
        fontWeight: "bold",
        fontSize: 15,
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
        backgroundColor: "#d9138a",
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
        marginBottom: 15,
        textAlign: "center",
    },
});
