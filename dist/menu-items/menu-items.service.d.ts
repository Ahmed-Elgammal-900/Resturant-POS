import { MenuItems } from './menu-items.entity';
import { Repository } from 'typeorm';
export declare class MenuItemsService {
    private menuItemsRepository;
    constructor(menuItemsRepository: Repository<MenuItems>);
    findAll(): Promise<MenuItems[]>;
    getCategories(): Promise<any>;
}
