import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";

const gymReducer = ( state, action ) => {
    switch (action.type) {
        case 'fetch_gyms':
            return action.payload;
        default: 
            return state;
    }
};

const fetchGyms = (dispatch) => async () => { 
   try{ const response = await trackerApi.get('/allGyms');
    dispatch({ type: 'fetch_gyms', payload: response.data });
    }
    catch(error){
        console.log(error);
    }
};

const addGym = () => async (ID, result) => {
    await trackerApi.post('/gyms', { ID, result });
    await trackerApi.post('/pricelist')
};

export const { Provider, Context } = createDataContext(
    gymReducer,
    { fetchGyms,
      addGym 
    },
    []
);