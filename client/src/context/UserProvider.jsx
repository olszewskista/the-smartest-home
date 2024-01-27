import { createContext, useContext, useReducer } from 'react';

const UserContext = createContext({
    state: {
        name: '',
        role: '',
    },
    dispatch: () => {},
});

function reducer(state, action) {
    switch (action.type) {
        case 'LOGIN':
            return {
                name: action.payload.name,
                role: action.payload.role,
            };
        case 'LOGOUT':
            return null;
        default:
            return state;
    }
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUser() {
    return useContext(UserContext);
}

import PropTypes from 'prop-types';

export default function UserProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, null);
    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {children}
        </UserContext.Provider>
    );
}

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
