import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 0.87,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    noSocial: {
        flex: 0.13,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noSocialBtn: {
        elevation: 2,
        backgroundColor: "#c2cfdc",
        borderRadius: 2,
        padding: 3
    },
    nickname: {
        marginTop: '5%',
        marginBottom: '20%',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ccc',
        fontSize: 18
    },
    ip: {
        marginTop: '5%',
        marginLeft: '2%',
        marginRight: '2%',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ccc',
        fontSize: 18
    },
    logout: {
        flex: 0.13,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    H6: {
        fontSize: 20,
        fontFamily: 'Titillium-Regular'
    }
});

export { styles };