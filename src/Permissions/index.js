import { PermissionsAndroid } from "react-native";

export async function requestFineLocationPermission() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'PAUN Geolocalization',
                message: 'PAUN needs to retrieve your position in order to guide you.',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the position');
        } else {
            console.log('Position permission denied');
        }
    } catch (err) {
        console.warn(err);
    }

}