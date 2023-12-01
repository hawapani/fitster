import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";

const minBalance = 200;

const walletReducer = ( state, action ) => {
    switch (action.type) {
        case 'fetch_balance':
            return {...state, balance: action.payload};
        case 'create_wallet':
            return {...state, walletExists: true, balance: action.payload};
        case 'delete_wallet':
            return {...state, walletExists: action.payload};
        case 'update_balance':
            return {...state, balance: action.payload};
        case 'low_balance':
            return {...state, isLowBalance: action.payload};
        case 'high_balance':
            return {...state, isLowBalance: action.payload}
        default: 
            return state;
    }
};

const createWallet = (dispatch) => async () => {
    try{ 
        const response = await trackerApi.post('/wallet');
        dispatch({ type: 'create_wallet', payload: response.data.balance });
    }
    catch(error){
        console.log(error);
    }
};

const deleteWallet = (dispatch) => async () => {
    try{ const response =  await trackerApi.post('/deleteWallet');
        console.log(response.data);
        dispatch({ type: 'delete_wallet', payload: false});
    }
    catch(error){
        console.log(error);
    }
};

const fetchBalance = (dispatch) => async () => { 
   try{ const response = await trackerApi.get('/balance');
    dispatch({ type: 'fetch_balance', payload: response.data.balance });
    }
    catch(error){
        console.log(error);
    }
};

const updateBalance = (dispatch) => async (newBalance) => {
    try { const response = await trackerApi.post('/balance', { newBalance });
        checkLowBalance(response.data.balance);
        dispatch({ type: 'update_balance', payload: response.data.balance})
    }
    catch(error){
        console.log(error);
    }
};

const checkLowBalance = (dispatch) => (currentBalance) => {
    if (currentBalance<minBalance)
    {
        dispatch({ type: 'low_balance', payload: true});
    }
    else{
        dispatch({ type: 'high_balance', payload: false});
    }
}

export const { Provider, Context } = createDataContext(
    walletReducer,
    {   createWallet,
        deleteWallet,
        fetchBalance,
        updateBalance,
        checkLowBalance
    },
    { balance: 0, walletExists: false, isLowBalance: true}
);