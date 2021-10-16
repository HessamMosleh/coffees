import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Public } from '../common/decorators/public.decorator';
import { ParseIntPipe } from "../common/pipes/parse-int.pipe";

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeeService: CoffeesService) {}

  @Get()
  @Public()
  async findAll(@Query() pagination: PaginationQueryDto) {
    //SIMULATE 5 SECONDS WAITING.
    // await new Promise((resolve) => {
    //   setTimeout(resolve, 5000);
    // });
    return this.coffeeService.findAll(pagination);
  }

  @Get(':id')
  fetchId(@Param('id', ParseIntPipe) id: string) {
    return this.coffeeService.findOne(id);
  }

  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeeService.create(createCoffeeDto);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeeService.update(id, updateCoffeeDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.coffeeService.remove(id);
  }
}
