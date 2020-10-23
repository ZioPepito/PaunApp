import React from 'react';
import { StyleSheet, Image } from 'react-native';

export default function Logo() {
    return ( 
        <Image
            resizeMode="stretch"
            style={styles.logo}
            source={require(".././img/paun-logo.png")}
        />
        );
}

const styles = StyleSheet.create({
    logo: {
        aspectRatio: 1,
        width: "80%",
        height: undefined,
        marginBottom: '2%'
    }
});