import { MenuItemsService } from './menu-items.service';
export declare class MenuItemsController {
    private menuItemsService;
    constructor(menuItemsService: MenuItemsService);
    findAll(): Promise<import("./menu-items.entity").MenuItems[]>;
    getCategories(): Promise<any>;
}
