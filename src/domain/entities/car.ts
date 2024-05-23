export class Car {
  id?: string;
  name: string;
  year: number;
  image: string;
  createdAt?: string;

  constructor(name: string, year: number, image: string, id?: string, createdAt?: string) {
    if (id) this.id = id;
    this.name = name;
    this.year = year;
    this.image = image;
    if (createdAt) this.createdAt = createdAt;
  }
};
