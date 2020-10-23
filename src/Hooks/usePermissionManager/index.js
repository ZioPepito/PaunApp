import React, { useEffect, useState } from "react";
import { PermissionsAndroid } from "react-native";

function requestFineLocationPermission() {
    return PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
            title: 'PAUN Geolocalization',
            message: 'PAUN needs to retrieve your position in order to guide you.',
            buttonNeutral: 'Ask me later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
        },
    );
}

/**
 * usePermissionManager is a hook that encapsulate permission requests to the OS.
 */
export default function usePermissionManager() {
    const [hasLocationPermission, setLocationPermission] = useState(false);

    useEffect(() => {
        requestFineLocationPermission()
            .then(result => setLocationPermission(result === PermissionsAndroid.RESULTS.GRANTED))
            .catch(() => setLocationPermission(false));
    }, []);
    
    // Return an object containing several useful info
    return {
        hasLocationPermission,
    }
}