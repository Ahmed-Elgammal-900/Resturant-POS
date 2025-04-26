import { Orders } from './orders.entity';
import { Repository } from 'typeorm';
import { OrdersGateway } from './orders.gateway';
export declare class OrdersService {
    private ordersRepository;
    private ordersGateway;
    constructor(ordersRepository: Repository<Orders>, ordersGateway: OrdersGateway);
    getOrders(): Promise<any>;
    getOrdersIDs(): Promise<any>;
    finishOrder(orderID: string): Promise<any>;
    insertOrders(data: any): string;
}
