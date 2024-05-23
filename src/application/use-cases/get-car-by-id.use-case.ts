import { CarInterface } from "../../domain/interfaces/car.interface.ts";

export class GetCarByIdUseCase {
  constructor(private readonly carRepository: CarInterface) {}

  async execute(id: string) {
    return this.carRepository.getById(id);
  }
}
