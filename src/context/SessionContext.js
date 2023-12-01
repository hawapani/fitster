import { Alert  } from "react-native";
import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";

const sessionReducer = (state,action) => {
  switch (action.type) {
      case 'start_session':
          return { ...state, sessionID: action.payload };
      case 'stop_session':
          return { ...state, sessionID: action.payload };
      default: 
          return state;
  }
};

const startSession = (dispatch) => async (scanTime, gymID, isLowBalance) => {
  try {   
      if(!isLowBalance) {
          const session = await trackerApi.post('/startSession', { gymID, scanTime });
          const _id = session._id;
          showAlert(0);
          dispatch({ type: 'start_session', payload: _id}); 
          }
      else{
          Alert.alert(
              'ERROR',
              'Wallet balance low!',
              [
                {
                  text: 'OK',
                  onPress: () => console.log('OK Pressed'),
                },
              ],
              { cancelable: false }
            );
        
      }
  }
  catch(error){
      console.log(error);
  }
};

const stopSession = (dispatch) => async (scanTime, duration, sessionID, gymID, balance, updateBalance) => {
  try {   
      await trackerApi.post('/stopSession', { sessionID , scanTime });
      const response = await trackerApi.get('/price', { gymID });
      const pricePerMinute = response.data.perMinPrice;
      showAlert(1);
      billing(duration, pricePerMinute, balance, updateBalance);
      dispatch({ type: 'stop_session', payload: null});
  }
  catch(error){
      console.log(error);
  }
};

const billing = () => async (duration, pricePerMinute) => { 
  const totalPrice = pricePerMinute * duration;
  const newBalance = balance - totalPrice;

  updateBalance(newBalance);
}

const showAlert = (status) => {
  if(status) {
    Alert.alert(
      'Thank you!',
      'Your session has finished!',
      [
        {
          text: 'OK',
          onPress: () => console.log('OK Pressed'),
        },
      ],
      { cancelable: false }
    );
  } else {
    Alert.alert(
      'Welcome',
      'Your session has started!',
      [
        {
          text: 'OK',
          onPress: () => console.log('OK Pressed'),
        },
      ],
      { cancelable: false }
    );
  }
};
  

export const { Context, Provider} = createDataContext(
  sessionReducer,
  { startSession, stopSession},
  {sessionID: null }
);