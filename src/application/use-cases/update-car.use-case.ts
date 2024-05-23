import { CarInterface } from "../../domain/interfaces/car.interface.ts";
import { Car } from "../../domain/entities/car.ts";

export class UpdateCarUseCase {
  constructor(private readonly carRepository: CarInterface) {}

  async execute(id: string, car: Car) {
    return this.carRepository.update(id, car);
  }
}
