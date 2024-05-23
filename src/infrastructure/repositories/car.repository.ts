import { CarInterface } from "../../domain/interfaces/car.interface.ts";
import { Car } from '../../domain/entities/car';
import axios from 'axios';
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-async-storage/async-storage';

export class CarRepository implements CarInterface {
  private readonly baseUrl = "https://664ea639fafad45dfae0ad77.mockapi.io/api/v1/cars";

  async getAll(): Promise<Car[]> {
    const state = await NetInfo.fetch();
    if (!state.isConnected) {
      const storedData = await AsyncStorage.getItem('cachedCars');
      return storedData ? JSON.parse(storedData) : Promise.reject('No internet connection and no local data');
    }

    try {
      const response = await axios.get<Car[]>(this.baseUrl);
      await AsyncStorage.setItem('cachedCars', JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch cars from API');
    }
  }

  async getById(id: string): Promise<Car> {
    try {
      const response = await axios.get<Car>(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch car from API');
    }
  }

  async create(car: Car): Promise<Car> {
    try {
      const response = await axios.post<Car>(this.baseUrl, car);
      return response.data;
    } catch (error) {
      throw new Error('Failed to create car from API');
    }
  }

  async update(id: string, car: Car): Promise<Car> {
    try {
      const response = await axios.put<Car>(`${this.baseUrl}/${id}`, car);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update car from API');
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await axios.delete(`${this.baseUrl}/${id}`);
    } catch (error) {
      throw new Error('Failed to delete car from API');
    }
  }
}
