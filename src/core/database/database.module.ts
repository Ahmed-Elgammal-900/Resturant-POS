import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { MenuItems } from 'src/menu-items/menu-items.entity';
import { Orders } from 'src/orders/orders.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<TypeOrmModuleOptions> => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('USER_NAME'),
        password: configService.get<string>('PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [MenuItems, Orders],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
