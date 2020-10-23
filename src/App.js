import React from 'react';
import Stack from './Routes/Stack';
import { Provider } from 'react-redux';
import { store } from './Redux';

/**
 * @author: Luca Vicidomini <vicidomini@gmail.com>
 * @author: Gianmarco Russo <gianmarco.russo1995@gmail.com>
 * @copyright ISISLab, Università degli Studi di Salerno
 */

export default function App() {
    return (
        <Provider store={store}>
            <Stack />
        </Provider>
    );
}