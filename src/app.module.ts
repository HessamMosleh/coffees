import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeeModule } from './coffee/coffee.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    CoffeeModule,
    MongooseModule.forRoot('mongodb://localhost:27017/coffee'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
