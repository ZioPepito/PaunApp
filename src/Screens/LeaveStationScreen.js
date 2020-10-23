import React from 'react';
import { View, ScrollView, Text, Button } from 'react-native';
import { endSession } from '../Networking/ServerCom';
import { styles } from '../Style/Styles';

import LanguageSelectionPanel from '.././Ui/LanguageSelectionPanel';
import Logo from '.././Ui/Logo';

export default function LeaveStationScreen({ navigation }) {
    const id = navigation.getParam('id');
    const locationId = navigation.getParam('locationId');

    return (
        <ScrollView contentContainerStyle={{ flex: 1 }}>
            <View style={styles.container}>
                <LanguageSelectionPanel />
                <Logo />
                <Text style={styles.H6}>Premi il pulsante per terminare</Text>
                <View style={{ marginTop: '10%' }}>
                    <Button
                        title="Lascia postazione"
                        onPress={
                            async () => {
                                try {
                                    endSession(id, locationId, 'dado:true;coins:5',
                                () => {
                                    console.log('session ended');
                                    navigation.navigate('Game')
                                        }, error => console.log(error))
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