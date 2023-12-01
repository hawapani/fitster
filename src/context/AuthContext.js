import AsyncStorage from "@react-native-async-storage/async-storage";
import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import { navigate } from "../navigationRef";


const authReducer = (state, action ) => {
    switch(action.type) {
        case 'add_error':
            return { ...state, errorMessage: action.payload};
        case 'clear_Error':
            return {...state, errorMessage: ''};
        case 'signin':
            return {errorMessage: '', token: action.payload};
        case 'signout':
            return { token: null, errorMessage: ''};
        default:
            return state;
    }
};

const tryLocalSignin = (dispatch) => async() => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
        dispatch({type: signin, payload: token});
        navigate('HomeScreen');
    } else {
        navigate('Signin');
    }
}

const clearErrorMessage = (dispatch) => () => {
    dispatch({type: 'clear_Error'});
}

const signup = (dispatch) => async ({ email, password}) => {
    try {
        const response = await trackerApi.post('/signup', {email,password});
        await AsyncStorage.setItem('token', response.data.token);
        dispatch({type: 'signin', payload: response.data.token});
        navigate('HomeScreen');
    } catch (err) {
        dispatch({type: 'add_error', payload: 'Something went wrong with Sign Up'})
    }

};

const signin = (dispatch) => async ({ email, password}) => {
    try {
        const response = await trackerApi.post('/signin', {email,password});
        await AsyncStorage.setItem('token', response.data.token);
        dispatch({type: 'signin', payload: response.data.token});
        navigate('HomeScreen');
    } catch (err) {
        dispatch({type: 'add_error', payload: 'Something went wrong with Sign in'})
    }

};

const signout = (dispatch) => async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        if(token) {
            await AsyncStorage.removeItem('token');
            console.log(token);
            dispatch({ type: 'signout' });
          //  navigate('GymDetail');                              This line is not working for some reason
        } 
    } catch (err) {
    console.log(err);
    }
};

export const { Context, Provider } = createDataContext (
    authReducer,
    { signup, signin, signout, clearErrorMessage, tryLocalSignin},
    { token: null, errorMessage: ''}
);