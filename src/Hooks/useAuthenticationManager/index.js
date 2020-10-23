import React, { useState } from "react";
import Auth0 from "react-native-auth0";
import {auth0 as auth0config} from "../../../app.json";

export default function useAuthenticationManager() {
    const auth0 = new Auth0(auth0config);
    const [accessToken, setAccessToken] = useState(null);
    const [userProfile, setUserProfile] = useState(null);

    const isLogged = accessToken !== null;

    // Clear auth info from the device (but not from the ID provider)
    const clearSession = () => {
        auth0.webAuth.clearSession()
            .then(response => { setAccessToken(null); setUserProfile(null); })
            .catch(error => console.error(error));
    }

    // Open the authentication
    const requestAuthentication = () => {
        auth0.webAuth.authorize({ scope: "openid profile email"})
            .then(credentials => {
                setAccessToken(credentials.accessToken);
                // We manually pass the token to requestUserProfile
                // because the state may not have been updated yet
                requestUserProfile(credentials.accessToken);
            })   
            .catch(error => console.log(error));
    }

    // Request user profile. If token is null, use accessToken from component's state
    const requestUserProfile = (token = null) => {
        // If user is not logged-in, we can't ask for user profile. But, if parameter
        // _token_ has been specified, maybe user is logged-in but the component's
        // state was not updated yet, so make the call anyway.
        // if (!token && !isLogged) {
        //  return;
        // }
        auth0.webAuth.client.userInfo({ token: token || accessToken})
            .then(user => setUserProfile(user))
            .catch(error => console.log(error))
    }

    return {
        accessToken,
        clearSession,
        isLogged,
        requestAuthentication,
        requestUserProfile,
        userProfile,
    }
}