import React from "react";
import { SafeAreaView } from "react-native";
import UnityView from "react-native-unity-view";
import { UnityModule } from 'react-native-unity-view';

export default function UnityScreen({ navigation }) {
    const id = navigation.getParam('id');
    const ip = navigation.getParam('ip');

    UnityModule.postMessageToUnityManager(id + '&' + ip);  //sending a message to Unity app

    const onUnityMessage = (handler) => {                  //handling messages from Unity app
        if (handler.name == 'getInfo') {
            UnityModule.postMessageToUnityManager(id + '&' + ip);
        }else if (handler.name == 'ARSessionEnded') {
            navigation.goBack();
        } else {
            console.log('LOGREACT: ' + handler.name);
            const locID = handler.name;
            navigation.navigate('GoToStation', { id, locID }); //this is for testing purpose. *
            console.log('LOGREACT: log dopo navigate');
            //*TODO: navigate to a screen waiting for the user to finish playing 
            //and let him click to confirm that he is leaving the workstation
        }
    }

    return (
        <SafeAreaView style={{
            position: 'absolute', top: 0, bottom: 0, left: 0, right: 0,
            justifyContent: 'center', alignItems: 'center', backgroundColor: 'black'
        }}>
            <UnityView
                style={{ position: 'absolute', top: 1, left: 0, right: 0, bottom: 0 }}
                onUnityMessage={onUnityMessage.bind(this)}
            />
        </SafeAreaView>
    );
}