import { createStore } from 'redux';

const initialState = {
    logout: false
}

export const store = createStore(reducer, initialState);

function reducer(state, action) {
    switch (action.type) {
        case 'UPDATE_LOGOUT':
            return {
                state,
                logout: action.payload
            };
        default:
            return state;
    }
}

export const updateLogoutAction = (logout) => ({
    type: 'UPDATE_LOGOUT',
    payload: logout
})