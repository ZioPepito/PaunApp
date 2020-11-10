import React from 'react';
import Stack from './Routes/Stack';
import { Provider } from 'react-redux';
import { store } from './Redux';
import AsyncStorage from '@react-native-community/async-storage';
import PushNotification from 'react-native-push-notification';
import GetLocation from 'react-native-get-location';
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';
import * as Workstations from './Workstations/Workstations';
import { checkSession } from './Networking/ServerCom';

/**
 * @author: Luca Vicidomini <vicidomini@gmail.com>
 * @author: Gianmarco Russo <gianmarco.russo1995@gmail.com>
 * @copyright ISISLab, Università degli Studi di Salerno
 */

function distance(lat1, lon1, lat2, lon2, unit) {   //function to calculate the distance between 2 coordinates points on Earth
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    }
    else {
        var radlat1 = Math.PI * lat1 / 180;
        var radlat2 = Math.PI * lat2 / 180;
        var theta = lon1 - lon2;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == "K") { dist = dist * 1.609344 }
        if (unit == "N") { dist = dist * 0.8684 }
        return dist;
    }
}

function workstationNearby(location, lastWorkstation) { //function to know if user is close to a workstation
    const lat = location.latitude.toString();
    const long = location.longitude.toString();
    var workstation = 0;

    if (distance(lat, long, Workstations.workstation1.lat, Workstations.workstation1.long, 'K') <= 0.01) workstation = 1;
    else if (distance(lat, long, Workstations.workstation2.lat, Workstations.workstation2.long, 'K') <= 0.01) workstation = 2;
    else if (distance(lat, long, Workstations.workstation3.lat, Workstations.workstation3.long, 'K') <= 0.01) workstation = 3;
    else if (distance(lat, long, Workstations.workstation4.lat, Workstations.workstation4.long, 'K') <= 0.01) workstation = 4;
    else if (distance(lat, long, Workstations.workstation5.lat, Workstations.workstation5.long, 'K') <= 0.01) workstation = 5;
    else if (distance(lat, long, Workstations.workstation6.lat, Workstations.workstation6.long, 'K') <= 0.01) workstation = 6;
    console.log('Utente vicino alla workstation ' + workstation);
    return workstation == lastWorkstation ? 0 : workstation;
}

export default function App() {
    var lastVisitedWorkstation = 0; //variable to know wich was the last workstation visited
    var userID;
    
    //PUSH NOTIFICATION CONFIGURATION
    PushNotification.configure({
        onRegister: function (token) {
            console.log("TOKEN:", token);
        },
        onNotification: function (notification) {
            console.log("NOTIFICATION:", notification);
        },
        permissions: {
            alert: true,
            badge: true,
            sound: true,
        },
        popInitialNotification: true,
        requestPermissions: Platform.OS === 'ios',
    });

    //BACKGROUND LOCATION TRACKING CONFIGURATION
    BackgroundGeolocation.configure({
        locationProvider: BackgroundGeolocation.DISTANCE_FILTER_PROVIDER,
        desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
        stationaryRadius: 10,
        distanceFilter: 5,
        debug: false,
        stopOnTerminate: true,
        startOnBoot: false,
        interval: 9000,
        fastestInterval: 4000,
        activitiesInterval: 9000,
        stopOnStillActivity: false,
        notificationsEnabled: false,
        startForeground: false,
        notificationTitle: 'PaunApp traccia la poszione',
        notificationText: 'per avvisarti quando ti avvicini ad una postazione',
        url: 'http://192.168.81.15:3000/location',
        httpHeaders: {},
        // customize post properties
        postTemplate: null,
    });

    //BACKGROUND LOCATION TRACKING USAGE (works only in background, not working when app killed)
    BackgroundGeolocation.start();
    BackgroundGeolocation.on('location', (location) => {
        console.log('BackGeoLoc: ', location);
        const workstation = workstationNearby(location, lastVisitedWorkstation);
        AsyncStorage.getItem('RegID').then(id => { userID = id });
        console.log('ID UTENTE: ' + userID);
        try {
            checkSession(userID, workstation,
                () => console.log('già giocato alla postazione ' + workstation),
                (status) => {
                    if (workstation != 0 && status == 404) {
                        lastVisitedWorkstation = workstation;
                        PushNotification.localNotificationSchedule({
                            title: "Sei vicino alla postazione " + workstation, // (optional)
                            message: "Scansiona il QR per utilizzarla", // (required)
                            date: new Date(Date.now() + 1 * 1000),
                            allowWhileIdle: true,
                        });
                    }
                })
        } catch (error) {
            console.log(error);
        }
    });


    //GET LOCATION every 10 seconds and notify if near workstation (doesn't work in background)
    setInterval(() => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000
        }).then(location => {
            console.log('ForeGetLoc: ', location);
            const workstation = workstationNearby(location, lastVisitedWorkstation);
            AsyncStorage.getItem('RegID').then(id => { userID = id });
            console.log('ID UTENTE: ' + userID);
            try {
                checkSession(userID, workstation,
                    () => console.log('già giocato alla postazione ' + workstation),
                    (status) => {
                        if (workstation != 0 && status == 404) {
                            lastVisitedWorkstation = workstation;
                            PushNotification.localNotificationSchedule({
                                title: "Sei vicino alla postazione " + workstation, // (optional)
                                message: "Scansiona il QR per utilizzarla", // (required)
                                date: new Date(Date.now() + 1 * 1000),
                                allowWhileIdle: true,
                            });
                        }
                    })
            } catch (error) {
                console.log(error);
            }
        }).catch(error => {
            const { code, message } = error;
            console.warn(code, message);
        })
    }, 9000);

    return (
        <Provider store={store}>
            <Stack />
        </Provider>
    );
}