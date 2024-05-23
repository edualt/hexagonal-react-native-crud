import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, Button, Alert, StyleSheet } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { Car } from "../../../domain/entities/car.ts";
import { GetCarByIdUseCase } from "../../../application/use-cases/get-car-by-id.use-case.ts";
import { DeleteCarUseCase } from "../../../application/use-cases/delete-car.use-case.ts";
import { CarRepository } from '../../repositories/car.repository';
import { CarDetailScreenProps } from "../../../../App.tsx";

type ParamList = {
  CarDetails: {
    carId: string;
  };
};

export const CarDetailScreen = ({ navigation } : CarDetailScreenProps) => {
  const [car, setCar] = useState<Car | null>(null);
  const route = useRoute<RouteProp<ParamList, 'CarDetails'>>();
  const { carId } = route.params;
  const getCarById = new GetCarByIdUseCase(new CarRepository());

  useEffect(() => {
    getCarById.execute(carId)
      .then(setCar);
  }, []);

  const handleDeletePress = () => {
    const deleteCar = new DeleteCarUseCase(new CarRepository());
    deleteCar.execute(carId)
      .then(() => {
        Alert.alert('Success', 'Car deleted successfully');
        navigation.navigate('AllCars');
      })
      .catch((error) => Alert.alert('Error', error.message));
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {car && (
          <View>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>{car.name} ({car.year})</Text>
            <Image source={{ uri: car.image }} style={{ width: '100%', height: 200 }} resizeMode="contain" />
            <Text>Date Added: {car.createdAt}</Text>
          </View>
        )}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button title="Edit Car" onPress={() => navigation.navigate('UpdateCar', { carId })} />
        <Button title="Delete Car" onPress={handleDeletePress} color="red" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 60,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  }
});
