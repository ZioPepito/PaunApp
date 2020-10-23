import React, { useState } from 'react';
import { View, Button, ScrollView, TextInput } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { register } from '../Networking/ServerCom';
import { styles } from '../Style/Styles';

import LanguageSelectionPanel from '.././Ui/LanguageSelectionPanel';
import Logo from '.././Ui/Logo';

export default function ChooseNicknameScreen({ navigation }) {
    const [nickname, setNickname] = useState(navigation.getParam('userName')); 
    const error = 'Il tuo nickname deve contenere piu\' di 5 caratteri';
    const id = navigation.getParam('id');
    const ip = navigation.getParam('ip');
       
    return (
        <ScrollView contentContainerStyle={{ flex: 1 }}>
            <View style={styles.container}>
                <LanguageSelectionPanel />
                <Logo />
                <TextInput
                    style={styles.nickname}
                    placeholder="Scegli nickname"
                    onChangeText={ nickname => setNickname(nickname) }
                    defaultValue={nickname}
                    maxLength={20}
                />
                <Button
                    title="Conferma"
                    onPress={
                        async () => {
                            if (nickname != null && nickname.length > 5) {
                                try {
                                    await AsyncStorage.setItem('Nickname', nickname);
                                } catch (error) {
                                    console.log(error);
                                }
                                if (navigation.getParam('userName') == undefined) {
                                    try {
                                        register((id) => navigation.navigate('Game', { nickname, id, ip }),
                                            (error) => console.log(error), nickname);
                                    } catch (error) {
                                        console.log(error);
                                    }
                                } else
                                    navigation.navigate('Game', { nickname, id, ip });
                            } else
                                alert(error);
                        }
                    }
                />
            </View>
        </ScrollView>
    );
}