import NetInfo from "@react-native-community/netinfo";
import axios from 'axios';

export const create = (carData) => {
  return async (dispatch, getState) => {
    const { isConnected } = getState().network;

    if (!isConnected) {
      // Queue the action (you could store it in Redux state or AsyncStorage)
      dispatch({
        type: 'QUEUE_ACTION',
        payload: { type: 'ADD_CAR', data: carData }
      });
    } else {
      try {
        const response = await axios.post('https://api.example.com/cars', carData);
        dispatch({ type: 'ADD_CAR_SUCCESS', payload: response.data });
      } catch (error) {
        dispatch({ type: 'ADD_CAR_FAILURE', error });
      }
    }
  };
};
