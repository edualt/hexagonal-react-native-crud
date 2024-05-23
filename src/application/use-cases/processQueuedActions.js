// This could be a thunk action or a simple action creator that handles the logic to process all queued actions.
export const processQueuedActions = (actions) => {
  return (dispatch, getState) => {
    actions.forEach(action => {
      dispatch(action); // Re-dispatch each stored action
    });
    // Optionally clear the queue after processing
    dispatch({ type: 'CLEAR_QUEUED_ACTIONS' });
  };
};
