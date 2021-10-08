import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Flavor } from './entities/flavor.entity';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Event } from '../event/entity/event.entity';
import { LANGUAGE, StringConst } from '../constant/string.constant';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
    private readonly connection: Connection,
    @Inject(LANGUAGE)
    private readonly STRINGS: StringConst,
  ) {}

  findAll(pagination: PaginationQueryDto) {
    console.log(this.STRINGS['es'].HELLO);
    const { offset, limit } = pagination;
    return this.coffeeRepository.find({
      relations: ['flavors'],
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: string) {
    const coffee = await this.coffeeRepository.findOne(id);
    if (!coffee) throw new NotFoundException(`Coffee with ${id} id not found`);
    return coffee;
  }

  async create(createDto: CreateCoffeeDto) {
    const flavors = await Promise.all(
      createDto.flavors.map((it) => this.preloadFlavorByName(it)),
    );
    const coffee = this.coffeeRepository.create({ ...createDto, flavors });
    return this.coffeeRepository.save(coffee);
  }

  async update(id: string, updateDto: UpdateCoffeeDto) {
    const flavors =
      updateDto.flavors &&
      (await Promise.all(
        updateDto.flavors.map((it) => this.preloadFlavorByName(it)),
      ));

    const existingCoffee = await this.coffeeRepository.preload({
      id: Number(id),
      ...updateDto,
      flavors,
    });
    if (!existingCoffee) {
      throw new NotFoundException(`Coffee with ${id} id not found`);
    }
    return this.coffeeRepository.save(existingCoffee);
  }

  async remove(id: string) {
    const coffee = await this.findOne(id);
    return this.coffeeRepository.remove(coffee);
  }

  async recommendCoffee(coffee: Coffee) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      coffee.recommendations++;

      const recommendEvent = new Event();
      recommendEvent.name = 'recommend_coffee';
      recommendEvent.type = 'coffee';
      recommendEvent.payload = { coffeeId: coffee.id };

      await queryRunner.manager.save(coffee);
      await queryRunner.manager.save(recommendEvent);
    } catch (e) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  private async preloadFlavorByName(name: string): Promise<Flavor> {
    const flavor = await this.flavorRepository.findOne({ name });
    if (flavor) return flavor;

    return this.flavorRepository.create({ name });
  }
}
