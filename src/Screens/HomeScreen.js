import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Button, ScrollView, Image, TextInput } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { updateLogoutAction } from '../Redux';
import { register, setURL } from '../Networking/ServerCom';
import { styles } from '../Style/Styles';

// Custom PAUN hooks
import useAuthenticationManager from '.././Hooks/useAuthenticationManager';

import LanguageSelectionPanel from '.././Ui/LanguageSelectionPanel';
import Logo from '.././Ui/Logo';

export default function HomeScreen({ navigation }) {
    const [ip, setIp] = useState('');

    AsyncStorage.getItem('ip')
        .then(ip => {
            if (ip !== null) {
                setIp(ip);
                setURL(ip);
            }
        })

    const logout = useSelector((state) => state.logout);
    const dispatch = useDispatch();

    AsyncStorage.getItem('Nickname')
        .then(nickname => {
            if (nickname !== null) {
                navigation.navigate('Game', { nickname });
            } 
        })
        .catch(err => console.log(err));
    
    const authManager = useAuthenticationManager();
    const userAvatar = authManager.isLogged && authManager.userProfile && authManager.userProfile.picture;
    const userName = authManager.userProfile && authManager.userProfile.name;
        
    const guest = (
        <Button
            title="Connetti con un social"
            onPress={() => !authManager.isLogged ? authManager.requestAuthentication() : dispatch(updateLogoutAction(false))}
        />
    );

    const logged = (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, flexDirection: "row", alignItems: "center", paddingHorizontal: 12 }}>
                {userAvatar && (
                    <Image
                        resizeMode="stretch"
                        style={{ aspectRatio: 1, height: 50, borderRadius: 50, marginRight: 10 }}
                        source={{ uri: userAvatar }}
                    />
                )}
                <Text style={{ flexGrow: 1, marginRight: 10, fontFamily: 'Titillium-Regular' }}>
                    {userName}
                </Text>
                <Button
                    title="Logout"
                    onPress={() => authManager.clearSession()}
                />
            </View>
            <View>
                <Button
                    title="Continua"
                    onPress={
                        async () => {
                            try {
                                await AsyncStorage.setItem('userProfile', JSON.stringify(authManager.userProfile));
                            } catch (error) {
                                console.log(error);
                            }
                            try {
                                if (authManager.userProfile.sub.includes('google')) {
                                    register((id) => navigation.navigate('ChooseNickname', { userName, id }),
                                        (error) => console.log(error), userName, null, authManager.userProfile.email);
                                } else if (authManager.userProfile.sub.includes('facebook')) {
                                    register((id) => navigation.navigate('ChooseNickname', { userName, id }),
                                        (error) => console.log(error), userName, authManager.userProfile.name, null);
                                } else console.log('Unsupported social');
                            } catch (error) {
                                console.log(error);
                            }
                        }
                    }
                />
            </View>
        </View>
    );

    return (
        <ScrollView contentContainerStyle={{ flex: 1 }}>
            <View style={styles.container}>
                <LanguageSelectionPanel />
                <Logo />
                {(authManager.isLogged && !logout) ? logged : guest}
                <TextInput
                    style={styles.ip}
                    placeholder="Inserisci IP"
                    onChangeText={
                        async (ip) => {
                            setIp(ip); setURL(ip);
                            try {
                                await AsyncStorage.setItem('ip', ip);
                            } catch (error) {
                                console.log(error);
                            }
                        }
                    }
                    defaultValue={ip}
                />
            </View>
            <View style={styles.noSocial}>
                <TouchableOpacity style={styles.noSocialBtn}>
                    <Text
                        style={{ fontFamily: 'Titillium-Regular' }}
                        onPress={() => navigation.navigate('ChooseNickname', { ip })}
                    > Prosegui senza social </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}