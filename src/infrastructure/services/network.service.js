import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NetInfo from "@react-native-community/netinfo";
import { processQueuedActions } from '../../application/use-cases/processQueuedActions'; // Assuming you create a use case for this

const NetworkService = () => {
  const dispatch = useDispatch();
  const queuedActions = useSelector(state => state.car.queuedActions);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected) {
        // Process all queued actions
        dispatch(processQueuedActions(queuedActions));
      }
    });

    return () => unsubscribe();
  }, [queuedActions, dispatch]);

  return null; // This component does not render anything
};

export default NetworkService;
