import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { CarRepository } from '../../repositories/car.repository';
import { GetAllCarsUseCase } from '../../../application/use-cases/get-all-cars.use-case.ts';
import { Car } from '../../../domain/entities/car';
import { AllCarsScreenProps } from "../../../../App.tsx";
import NetInfo from "@react-native-community/netinfo";

export const AllCarsScreen = ({ navigation }: AllCarsScreenProps) => {
  const [cars, setCars] = useState<Car[]>([]);
  const [isConnected, setIsConnected] = useState(true);
  const getAllCars = new GetAllCarsUseCase(new CarRepository());

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected ?? false);
    });

    loadData();

    return () => unsubscribe();
  }, [isConnected]);

  const loadData = async () => {
    try {
      getAllCars.execute()
        .then(setCars)
        .catch((error) => Alert.alert('Error', error.message));
    } catch (error) {
      Alert.alert('Error', 'Unable to fetch data');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {cars.map((car, index) => (
          <TouchableOpacity
            key={index}
            style={{ marginBottom: 20 }}
            onPress={() => navigation.navigate('CarDetails', { carId: car.id! })}
          >
            <Text style={{ fontSize: 18, fontWeight: '500' }}>{car.name} ({car.year})</Text>
            <Image source={{ uri: car.image }} style={{ width: '100%', height: 200 }} resizeMode="contain" />
            <Text>Date Added: {car.createdAt}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddCar')}
        activeOpacity={0.7}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8, // for Android shadow
    shadowColor: '#000', // for iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  addButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
