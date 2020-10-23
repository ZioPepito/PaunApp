import React from 'react';
import { View, ScrollView, Text, Button } from 'react-native';
import { confirmSession } from '../Networking/ServerCom';
import { styles } from '../Style/Styles';

import LanguageSelectionPanel from '.././Ui/LanguageSelectionPanel';
import Logo from '.././Ui/Logo';

export default function GoToStationScreen({ navigation }) {
    const id = navigation.getParam('id');
    const locationId = navigation.getParam('locationId');
    
    return (
        <ScrollView contentContainerStyle={{ flex: 1 }}>
            <View style={styles.container}>
                <LanguageSelectionPanel />
                <Logo />
                <Text style={styles.H6}>Avvicinati alla postazione e conferma</Text>
                <View style={{ marginTop: '10%' }}>
                    <Button
                        title="Simulazione conferma da postazione"
                        onPress={
                            async () => {
                                try {
                                    confirmSession(id, locationId,
                                        (gameStates) => {
                                            console.log(gameStates);
                                            navigation.navigate('LeaveStation', { id, locationId })
                                        }, (error) => console.log(error))
                                } catch (error) {
                                    console.log(error);
                                }
                            }
                        }
                    />
                </View>
            </View>
        </ScrollView>
    );
}