import { Controller, Get, Param } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  @Get()
  findAll() {
    return 'find all';
  }

  @Get(':id')
  fetchId(@Param('id') id: string) {
    return `this is ur ${id}`;
  }
}
