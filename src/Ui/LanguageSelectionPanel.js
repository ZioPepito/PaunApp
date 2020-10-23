import React, { useContext } from 'react';
import { View, Button, StyleSheet } from 'react-native';
//import TransContext from "../Context/TransContext";


export default function LanguageSelectionPanel() {
    //const { t, i18n } = useContext(TransContext);
    
    return (
        <View style={styles.panel}>
            <View style={{ margin: 6 }}>
                <Button
                    //onPress={() => i18n.changeLanguage("it-IT")}
                    title="Italiano"
                />
            </View>
            <View style={{ margin: 6 }}>
                <Button
                    //onPress={() => i18n.changeLanguage("en-US")}
                    title="English"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    panel: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#fff',
        paddingTop: 10,
        marginBottom: 10,
    }
});