import React, { useState } from 'react';
import { Text, View, Button, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useDispatch } from 'react-redux';
import { updateLogoutAction } from '../Redux';
import { startSession } from '../Networking/ServerCom';
import { styles } from '../Style/Styles';
    
import LanguageSelectionPanel from '.././Ui/LanguageSelectionPanel';
import Logo from '.././Ui/Logo';

export default function GameScreen({ navigation }) {
    const dispatch = useDispatch();
    const [id, setId] = useState(navigation.getParam('id'));
    const [ip, setIp] = useState(navigation.getParam('ip'));

    if (id !== undefined) AsyncStorage.setItem('RegID', id).catch(err => console.log(err));
    if (id == undefined) AsyncStorage.getItem('RegID').then(RegID => setId(RegID)).catch(err => console.log(err));

    if (ip == undefined) AsyncStorage.getItem('ip').then(ip => setIp(ip)).catch(err => console.log(err));

    return (
        <ScrollView contentContainerStyle={{ flex: 1 }}>
            <View style={styles.container}>
                <LanguageSelectionPanel />
                <Logo />
                <Text style={styles.H6}>
                    Benvenuto {navigation.getParam('nickname')}! {/*this is temp*/}
                </Text>
                <View style={{ marginTop: '8%' }}>
                    <Button
                        title="Unity Sample"
                        onPress={() => navigation.navigate('Unity', { id , ip })}
                    />
                </View>
                <View style={{ marginTop: '6%' }}>
                    <Button
                        title="Simulazione QRCode"
                        onPress={
                            async () => {
                                try {
                                    startSession(id, 'location1',
                                        (gameStates) => {
                                            console.log(gameStates);
                                            navigation.navigate('GoToStation', { id, locationId: 'location1' })
                                        }, (error) => console.log(error))
                                } catch (error) {
                                    console.log(error);
                                }
                            }
                        }
                    />
                </View>
            </View>
            <View style={styles.logout}>
                <Text style={{ fontFamily: 'Titillium-Regular' }}> {navigation.getParam('nickname')} </Text>
                <TouchableOpacity>
                    <Text
                        style={{ textDecorationLine: 'underline', fontFamily: 'Titillium-Regular'}}
                        onPress={
                            async () => {
                                try {
                                    await AsyncStorage.removeItem('Nickname');
                                } catch (error) {
                                    console.log(value);
                                }
                                navigation.navigate('Home');
                                dispatch(updateLogoutAction(true));
                            }
                        }
                    > Logout </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}