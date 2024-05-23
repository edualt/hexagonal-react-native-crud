import { CarInterface } from "../../domain/interfaces/car.interface.ts";
import { Car } from '../../domain/entities/car';
import axios from 'axios';

export class CarRepository implements CarInterface {
  private readonly baseUrl = "https://664ea639fafad45dfae0ad77.mockapi.io/api/v1/cars";

  async getAll(): Promise<Car[]> {
    try {
      const response = await axios.get<Car[]>(this.baseUrl);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch cars from API');
    }
  }
}
