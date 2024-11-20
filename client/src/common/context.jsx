import { createContext, useReducer, useContext } from 'react';
import LocalStorage from './local-storage.js';

const initialState = {
    user: LocalStorage.getUser() || null,
    isAuthenticated: LocalStorage.isAuthenticated() || false,
    isLoading: false,
    error: null
};

const ActionTypes = {
    AUTH_START: 'AUTH_START',
    AUTH_SUCCESS: 'AUTH_SUCCESS',
    AUTH_FAILURE: 'AUTH_FAILURE',
    UPDATE_USER: 'UPDATE_USER',
    LOGOUT: 'LOGOUT'
};

const userReducer = (state, action) => {
    switch (action.type) {
        case ActionTypes.AUTH_START:
            return {
                ...state,
                isLoading: true,
                error: null
            };

        case ActionTypes.AUTH_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                user: action.payload.user,
                error: null
            };

        case ActionTypes.AUTH_FAILURE:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: false,
                error: action.payload.error
            };

        case ActionTypes.UPDATE_USER:
            return {
                ...state,
                user: { ...state.user, ...action.payload.user }
            };

        case ActionTypes.LOGOUT:
            return {
                ...initialState,
                user: null,
                isAuthenticated: false
            };

        default:
            return state;
    }
};

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialState);

    const login = async (loginResponse) => {
        try {
            dispatch({ type: ActionTypes.AUTH_START });
            LocalStorage.handleLoginSuccess(loginResponse);
            dispatch({
                type: ActionTypes.AUTH_SUCCESS,
                payload: { user: loginResponse.data.user }
            });
        } catch (error) {
            dispatch({
                type: ActionTypes.AUTH_FAILURE,
                payload: { error: error.message }
            });
        }
    };

    const logout = () => {
        LocalStorage.clearAuth();
        dispatch({ type: ActionTypes.LOGOUT });
    };

    const updateUser = (userData) => {
        dispatch({
            type: ActionTypes.UPDATE_USER,
            payload: { user: userData }
        });
    };

    const value = {
        ...state,
        login,
        logout,
        updateUser
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserContextProvider');
    }
    return context;
};

export default UserContext;