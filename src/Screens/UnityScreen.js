import React from "react";
import { SafeAreaView } from "react-native";
import UnityView from "react-native-unity-view";
import { UnityModule } from 'react-native-unity-view';

export default function UnityScreen({ navigation }) {
    const id = navigation.getParam('id');
    const ip = navigation.getParam('ip');
    
    return (
        <SafeAreaView style={{
            position: 'absolute', top: 0, bottom: 0, left: 0, right: 0,
            justifyContent: 'center', alignItems: 'center', backgroundColor: 'black'
        }}>
            <UnityView style={{ position: 'absolute', top: 1, left: 0, right: 0, bottom: 0 }} />
        </SafeAreaView>
    );
}