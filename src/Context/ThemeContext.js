import React from 'react';

const ThemeContext = React.createContext('default');

export const Themes = {
    'default': {
        Text: { }

    },
    'playful': {
        Button: {
            fontFamily: "Kalam-Regular"
        },
        Text: {
            color: "green",
            fontFamily: "Kalam-Regular"
        }
    }
}

export default ThemeContext;
