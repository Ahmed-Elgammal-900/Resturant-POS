import { Module } from '@nestjs/common';
import { DatabaseModule } from './core/database/database.module';
import { MenuItemsModule } from './menu-items/menu-items.module';
import { OrdersModule } from './orders/orders.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    MenuItemsModule,
    OrdersModule,
  ],
})
export class AppModule {}
