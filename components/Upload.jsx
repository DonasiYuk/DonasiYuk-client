import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Button,
    Image
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
        });

        if (!result.cancelled) {
            params.sendData(result.uri)
            setImage(result.uri);
        }
    };

    return (
        <View style={styles.mainBody}>
            <Button
                title="Choose Image"
                style={styles.buttonStyle}
                onPress={pickImage}
            />
            {
                image && <Image
                    source={{ uri: image }}
                    style={{ width: 200, height: 200 }}
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
});