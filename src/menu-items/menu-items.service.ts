import { Injectable } from '@nestjs/common';
import { MenuItems } from './menu-items.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MenuItemsService {
  constructor(
    @InjectRepository(MenuItems)
    private menuItemsRepository: Repository<MenuItems>,
  ) {}

  findAll(): Promise<MenuItems[]> {
    return this.menuItemsRepository.query(
      'SELECT name, price, category from menu_items',
    );
  }

  getCategories() {
    return this.menuItemsRepository.query(
      'SELECT DISTINCT category from menu_items',
    );
  }
}
