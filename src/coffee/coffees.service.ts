import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectModel(Coffee.name) private readonly coffeeModel: Model<Coffee>,
  ) {}

  findAll() {
    return this.coffeeModel.find();
  }
  async findOne(id: string) {
    const coffee = await this.coffeeModel.findOne({ _id: id });
    if (!coffee) throw new NotFoundException();

    return coffee;
  }

  async create(createDto: CreateCoffeeDto) {
    const coffee = await this.coffeeModel.create(createDto);
    return coffee;
  }

  async update(id: string, updateDto: UpdateCoffeeDto) {
    const existingCoffee = this.coffeeModel.findOneAndUpdate(
      { _id: id },
      { $set: updateDto },
      { new: true },
    );
    if (!existingCoffee) throw new NotFoundException();

    return existingCoffee;
  }

  async remove(id: string) {
    const existingCoffeeIndex = await this.findOne(id);
    return existingCoffeeIndex.remove();
  }
}
