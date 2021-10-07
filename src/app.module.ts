import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeeModule } from './coffee/coffee.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    CoffeeModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'coffee-admin',
      password: 'pass123',
      database: 'coffee',
      autoLoadEntities: true,
      synchronize: true, //disable it on production mode
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
