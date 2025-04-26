import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { OrdersService } from './orders.service';
import { forwardRef, Inject } from '@nestjs/common';

@WebSocketGateway({ cors: { origin: '*' } })
export class OrdersGateway {
  @WebSocketServer() server: Server;

  constructor(
    @Inject(forwardRef(() => OrdersService))
    private readonly ordersService: OrdersService,
  ) {}

  @SubscribeMessage('finishOrder')
  finishOrder(@MessageBody() orderID: string) {
    this.ordersService.finishOrder(orderID);
  }

  async handleConnection(client: Socket) {
    const orderIDs = await this.ordersService.getOrdersIDs();
    const orders = await this.ordersService.getOrders();
    client.emit('ordersList', orders, orderIDs);
  }
}
