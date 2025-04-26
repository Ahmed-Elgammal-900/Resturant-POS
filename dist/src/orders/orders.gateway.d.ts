import { Server, Socket } from 'socket.io';
import { OrdersService } from './orders.service';
export declare class OrdersGateway {
    private readonly ordersService;
    server: Server;
    constructor(ordersService: OrdersService);
    finishOrder(orderID: string): void;
    handleConnection(client: Socket): Promise<void>;
}
