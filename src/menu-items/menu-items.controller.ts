import { Controller, Get } from '@nestjs/common';
import { MenuItemsService } from './menu-items.service';

@Controller('menu-items')
export class MenuItemsController {
  constructor(private menuItemsService: MenuItemsService) {}

  @Get()
  async findAll() {
    return this.menuItemsService.findAll();
  }

  @Get('categories')
  async getCategories() {
    return this.menuItemsService.getCategories();
  }
}
