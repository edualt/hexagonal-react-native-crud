import { CarInterface } from "../../domain/interfaces/car.interface.ts";

export class GetAllCarsUseCase {
  constructor(private readonly carRepository: CarInterface) {}

  async execute() {
    return this.carRepository.getAll();
  }
}
