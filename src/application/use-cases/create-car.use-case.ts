import { CarInterface } from "../../domain/interfaces/car.interface.ts";
import { Car } from "../../domain/entities/car.ts";

export class CreateCarUseCase {
  constructor(private readonly carRepository: CarInterface) {}

  async execute(car: Car) {
    return this.carRepository.create(car);
  }
}
