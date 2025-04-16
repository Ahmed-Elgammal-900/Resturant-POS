import { Module } from '@nestjs/common';
import { MenuItemsController } from './menu-items.controller';
import { MenuItemsService } from './menu-items.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuItems } from './menu-items.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MenuItems])],
  controllers: [MenuItemsController],
  providers: [MenuItemsService],
})
export class MenuItemsModule {}
