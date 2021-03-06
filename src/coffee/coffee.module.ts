import { Module } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CoffeesController } from './coffeesController';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from '../event/entity/event.entity';
import { LANGUAGE, StringConst } from '../constant/string.constant';
import { ConfigModule } from '@nestjs/config';
import coffeeConfig from './config/coffee.config';

@Module({
  imports: [
    ConfigModule.forFeature(coffeeConfig),
    TypeOrmModule.forFeature([Coffee, Flavor, Event]),
  ],
  controllers: [CoffeesController],
  providers: [CoffeesService, { provide: LANGUAGE, useClass: StringConst }],
})
export class CoffeeModule {}
