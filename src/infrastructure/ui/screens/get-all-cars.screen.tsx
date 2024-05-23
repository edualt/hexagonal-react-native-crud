import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, Alert } from 'react-native';
import { CarRepository } from '../../repositories/car.repository';
import { GetAllCarsUseCase } from "../../../application/use-cases/get-all-cars.use-case.ts";
import { Car } from '../../../domain/entities/car';

export const GetAllCarsScreen = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const getAllCars = new GetAllCarsUseCase(new CarRepository());

  useEffect(() => {
    getAllCars.execute()
      .then(setCars)
      .catch((error) => Alert.alert('Error', error.message));
  }, []);

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>All Cars</Text>
      {cars.map((car, index) => (
        <View key={index} style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: '500' }}>{car.name} ({car.year})</Text>
          <Image source={{ uri: car.image }} style={{ width: '100%', height: 200 }} resizeMode="contain" />
          <Text>Date Added: {car.createdAt}</Text>
        </View>
      ))}
    </ScrollView>
  );
};
