import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Event } from '../events/entities/event.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectModel(Coffee.name) private readonly coffeeModel: Model<Coffee>,
    @InjectModel(Event.name) private readonly eventModel: Model<Event>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  findAll(pagination: PaginationQueryDto) {
    const { limit, offset } = pagination;
    return this.coffeeModel.find().skip(offset).limit(limit);
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

  async recommendCoffee(coffee: Coffee) {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      coffee.recommendation++;

      const recommendEvent = new this.eventModel({
        name: 'recommend_coffee',
        type: 'coffee',
        payload: { coffeeId: coffee.id },
      });

      await recommendEvent.save({ session });
      await coffee.save({ session });

      await session.commitTransaction();
    } catch (e) {
      await session.abortTransaction();
    } finally {
      session.endSession();
    }
  }
}
