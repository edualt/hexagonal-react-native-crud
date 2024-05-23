import { CarInterface } from "../../domain/interfaces/car.interface.ts";

export class DeleteCarUseCase {
  constructor(private readonly carRepository: CarInterface) {}

  async execute(id: string) {
    return this.carRepository.delete(id);
  }
}
