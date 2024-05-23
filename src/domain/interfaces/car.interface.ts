import { Car } from '../entities/car.ts';

export interface CarInterface {
  getAll(): Promise<Car[]>;
  getById(id: string): Promise<Car>;
  create(car: Car): Promise<Car>;
  update(id: string, car: Car): Promise<Car>;
  delete(id: string): Promise<void>;
}
