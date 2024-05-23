import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { AllCarsScreen } from "./src/infrastructure/ui/screens/all_cars_screen.tsx";
import { CarDetailScreen } from "./src/infrastructure/ui/screens/car_detail_screen.tsx";
import { CreateCarScreen } from "./src/infrastructure/ui/screens/create_car_screen.tsx";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { UpdateCarScreen } from "./src/infrastructure/ui/screens/update_car_screen.tsx";
import { Provider } from "react-redux";
import { store, persistor } from './src/store';
import { PersistGate } from 'redux-persist/integration/react';

export type RootStackParamList = {
  AllCars: undefined;
  CarDetails: { carId: string };
  AddCar: undefined;
  UpdateCar: { carId: string };
};

export type AllCarsScreenProps = NativeStackScreenProps<RootStackParamList, 'AllCars'>;
export type CarDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'CarDetails'>;
export type CreateCarScreenProps = NativeStackScreenProps<RootStackParamList, 'AddCar'>;
export type UpdateCarScreenProps = NativeStackScreenProps<RootStackParamList, 'UpdateCar'>;

const Stack = createStackNavigator<RootStackParamList>();

export const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="AllCars">
            <Stack.Screen name="AllCars" component={AllCarsScreen} options={{ title: 'All Cars' }} />
            <Stack.Screen name="CarDetails" component={CarDetailScreen} options={{ title: 'Car Details' }} />
            <Stack.Screen name="AddCar" component={CreateCarScreen} options={{ title: 'Add Car' }} />
            <Stack.Screen name="UpdateCar" component={UpdateCarScreen} options={{ title: 'Update Car' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};
