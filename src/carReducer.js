const initialState = {
  cars: [],          // List of cars
  queuedActions: [], // Actions queued when offline
  error: null,       // Error handling
};

export function carReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_CAR_SUCCESS':
      // Add a car to the list when the action is successful
      return { ...state, cars: [...state.cars, action.payload], error: null };

    case 'UPDATE_CAR_SUCCESS':
      // Update a car in the list
      return {
        ...state,
        cars: state.cars.map(car => car.id === action.payload.id ? action.payload : car),
        error: null
      };

    case 'DELETE_CAR_SUCCESS':
      // Remove a car from the list
      return {
        ...state,
        cars: state.cars.filter(car => car.id !== action.payload.id),
        error: null
      };

    case 'ADD_CAR_FAILURE':
    case 'UPDATE_CAR_FAILURE':
    case 'DELETE_CAR_FAILURE':
      // Handle failures for add, update, or delete
      return { ...state, error: action.error };

    case 'QUEUE_ACTION':
      // Queue an action when offline
      return { ...state, queuedActions: [...state.queuedActions, action.payload] };

    case 'CLEAR_QUEUED_ACTIONS':
      // Clear all queued actions, typically after they are processed
      return { ...state, queuedActions: [] };

    default:
      return state;
  }
}

export default carReducer;
