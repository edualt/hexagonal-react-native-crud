import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { CarRepository } from '../../repositories/car.repository';
import { GetCarByIdUseCase } from '../../../application/use-cases/get-car-by-id.use-case.ts';
import { Car } from '../../../domain/entities/car';
import { UpdateCarScreenProps } from "../../../../App.tsx";
import { UpdateCarUseCase } from '../../../application/use-cases/update-car.use-case.ts';

type ParamList = {
  CarDetails: {
    carId: string;
  };
};

export const UpdateCarScreen = ({ navigation } : UpdateCarScreenProps ) => {
  const [name, setName] = useState('');
  const [year, setYear] = useState(0);
  const [image, setImage] = useState('');

  const route = useRoute<RouteProp<ParamList, 'CarDetails'>>();
  const { carId } = route.params;

  useEffect(() => {
    const carRepository = new CarRepository();
    const getCarById = new GetCarByIdUseCase(carRepository);

    getCarById.execute(carId)
      .then(car => {
        setName(car.name);
        setYear(car.year);
        setImage(car.image);
      })
      .catch((error) => {
        Alert.alert('Error', 'Failed to load car details: ' + error.message);
      });
  }, [carId]);

  const handleUpdateCar = () => {
    const updatedCar = new Car(name, year, image);

    const updateCar = new UpdateCarUseCase(new CarRepository());
    updateCar.execute(carId, updatedCar)
      .then(() => {
        Alert.alert('Success', 'Car updated successfully');
        navigation.goBack();
      })
      .catch((error) => {
        Alert.alert('Error', error.message);
      });
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Update Car</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Image URL"
        value={image}
        onChangeText={setImage}
        style={styles.input}
      />
      <TextInput
        placeholder="Year"
        value={year.toString()}
        onChangeText={(text) => setYear(parseInt(text))}
        style={styles.input}
        keyboardType="number-pad"
      />
      <TouchableOpacity
        style={styles.createButton}
        onPress={handleUpdateCar}
        activeOpacity={0.7}
      >
        <Text style={styles.createButtonText}>Update</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: 'white',
  },
  createButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  createButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
});
