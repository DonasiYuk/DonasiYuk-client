import React from 'react'
import {
    View,
    StyleSheet,
    Text,
} from "react-native";

export default function HistoryTransaction() {
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text>INI nama donation</Text>
                <Text>amount</Text>
                <View style={{ flexDirection: "row" }}>
                    <Text style={{ textAlign: "left" }}>
                        status transaksi
                    </Text>
                    <Text style={{ marginLeft: "auto" }}>Tanggal</Text>
                </View>
            </View>
            <View style={styles.card}>
                <Text>INI nama donation</Text>
                <Text>amount</Text>
                <View style={{ flexDirection: "row" }}>
                    <Text style={{ textAlign: "left" }}>
                        status transaksi
                    </Text>
                    <Text style={{ marginLeft: "auto" }}>Tanggal</Text>
                </View>
            </View>
            <View style={styles.card}>
                <Text>INI nama donation</Text>
                <Text>amount</Text>
                <View style={{ flexDirection: "row" }}>
                    <Text style={{ textAlign: "left" }}>
                        status transaksi
                    </Text>
                    <Text style={{ marginLeft: "auto" }}>Tanggal</Text>
                </View>
            </View>
            <View style={styles.card}>
                <Text>INI nama donation</Text>
                <Text>amount</Text>
                <View style={{ flexDirection: "row" }}>
                    <Text style={{ textAlign: "left" }}>
                        status transaksi
                    </Text>
                    <Text style={{ marginLeft: "auto" }}>Tanggal</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: "center",
        backgroundColor: "#fff",
        padding: 10,
    },
    card: {
        borderBottomColor: 'black',
        borderBottomWidth: 0.5,
        marginTop: 10
    }
})