import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function Upload(params) {
    const [image, setImage] = useState(null);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });

        if (!result.cancelled) {
            params.sendData(result.uri)
            setImage(result.uri);
        }
    };

    return (
        <View style={styles.mainBody}>
            <TouchableOpacity
                style={styles.btn}
                onPress={pickImage}
            >
                <Text style={styles.text}>Choose Image</Text>
            </TouchableOpacity>
            {
                image && <Image
                    source={{ uri: image }}
                    style={styles.image}
                />}
        </View>
    )
};

const styles = StyleSheet.create({
    mainBody: {
        justifyContent: 'center',
        padding: 20,
    },
    buttonStyle: {
        backgroundColor: '#307ecc',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#307ecc',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 15,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginVertical: 10,
        marginHorizontal: "22.5%",
    },
    btn: {
        backgroundColor: '#3DB2FF',
        padding: 5,
        marginVertical: 20
    },
    btn: {
        backgroundColor: '#3DB2FF',
        padding: 5,
        marginVertical: 20
    },
    text: {
        textAlign: "center",
        padding: 10,
        fontWeight: 'bold'
    },
});