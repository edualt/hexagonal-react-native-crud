import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Alert, StyleSheet, TextInput } from "react-native";
import { CarRepository } from '../../repositories/car.repository';
import { CreateCarUseCase } from '../../../application/use-cases/create-car.use-case.ts';
import { Car } from '../../../domain/entities/car';
import { CreateCarScreenProps } from "../../../../App.tsx";

export const CreateCarScreen = ({ navigation } : CreateCarScreenProps) => {
  const [name, setName] = useState('');
  const [year, setYear] = useState(0);
  const [image, setImage] = useState('');

  const createCar = new CreateCarUseCase(new CarRepository());

  const handleCreateCar = () => {
    const car = new Car(name, year, image);

    createCar.execute(car)
      .then(() => {
        Alert.alert('Success', 'Car created successfully');
        navigation.navigate('AllCars');
      })
      .catch((error) => Alert.alert('Error', error.message));
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Create Car</Text>
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
        onPress={handleCreateCar}
        activeOpacity={0.7}
      >
        <Text style={styles.createButtonText}>Create</Text>
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
    borderColor: '#ccc', // Light grey border for the input fields
    borderRadius: 5, // Rounded corners for the input fields
    backgroundColor: 'white', // White background for the input fields
  },
  createButton: {
    backgroundColor: '#007BFF', // Blue background for the create button
    padding: 10,
    borderRadius: 5,
    alignItems: 'center', // Center align the text inside the button
    marginTop: 20,
  },
  createButtonText: {
    color: 'white', // White text color
    fontSize: 16, // Slightly larger font size for the button text
    fontWeight: 'bold', // Bold font weight for the button text
  }
});
