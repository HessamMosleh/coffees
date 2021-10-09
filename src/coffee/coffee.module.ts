import { Module } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CoffeesController } from './coffeesController';
import { LANGUAGE, StringConst } from '../constant/string.constant';
import { MongooseModule } from '@nestjs/mongoose';
import { Coffee, CoffeeSchema } from './entities/coffee.entity';
import { Event, EventSchema } from '../events/entities/event.entity';
import { ConfigModule } from '@nestjs/config';
import coffeeConfig from './config/coffee.config';

@Module({
  imports: [
    ConfigModule.forFeature(coffeeConfig),
    MongooseModule.forFeature([
      {
        name: Coffee.name,
        schema: CoffeeSchema,
      },
      {
        name: Event.name,
        schema: EventSchema,
      },
    ]),
  ],
  controllers: [CoffeesController],
  providers: [CoffeesService, { provide: LANGUAGE, useClass: StringConst }],
})
export class CoffeeModule {}
