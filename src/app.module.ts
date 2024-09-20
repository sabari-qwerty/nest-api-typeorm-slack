import { Module, ValidationPipe } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { pgConfig } from 'db.config';
import { Data } from './entities/data.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(pgConfig),
    TypeOrmModule.forFeature([Data]),
    HttpModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    },
    AppService,
  ],
})
export class AppModule {}
