import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeeModule } from './coffee/coffee.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CoffeeModule,
    CommonModule,
    MongooseModule.forRoot('mongodb://localhost:27017/coffee'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
