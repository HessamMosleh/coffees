import { Module } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CoffeesController } from './coffeesController';

@Module({ controllers: [CoffeesController], providers: [CoffeesService] })
export class CoffeeModule {}
