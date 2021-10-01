import { Injectable } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'shipwrek Roase',
      brand: 'Body Brew',
      flavor: ['chocolate', 'vanilla'],
    },
  ];

  findAll() {
    return this.coffees;
  }
  findOne(id: string) {
    return this.coffees.find((it) => it.id === +id);
  }

  create(createDto: any) {
    this.coffees.push(createDto);
    return createDto;
  }

  update(id: string, updateDto: any) {
    const existingCoffee = this.findOne(id);
    if (existingCoffee) {
      // Update Coffee
    }
  }

  remove(id: string) {
    const existingCoffeeIndex = this.coffees.findIndex((it) => it.id === +id);
    if (existingCoffeeIndex >= 0) this.coffees.splice(existingCoffeeIndex, 1);
  }
}
