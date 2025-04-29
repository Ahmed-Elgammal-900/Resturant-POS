import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Orders } from './orders.entity';
import { Repository } from 'typeorm';
import { OrdersGateway } from './orders.gateway';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Orders) private ordersRepository: Repository<Orders>,
    @Inject(forwardRef(() => OrdersGateway))
    private ordersGateway: OrdersGateway,
  ) {}

  getOrders() {
    return this.ordersRepository.query(
      'Select name, count, order_id, number from orders WHERE status = ?',
      ['bending'],
    );
  }

  getOrdersIDs() {
    return this.ordersRepository.query('SELECT DISTINCT order_id from orders');
  }

  async finishOrder(orderID: string) {
    await this.ordersRepository.query(
      'UPDATE orders SET status = "done" WHERE order_id = ?',
      [orderID],
    );
    return;
  }

  async insertOrders(body: any) {
    const orderID = `#${Math.floor(Math.random() * 1000)}`;
    const { data, customerNumber } = body;
    for (const { name, count } of data) {
      await this.ordersRepository.query(
        'INSERT INTO orders (name, count, order_id, number, status) VALUES (?, ?, ?, ?, ?)',
        [name, count, orderID, customerNumber, 'pending'],
      );
    }

    this.ordersGateway?.server.emit('new order', data, orderID);

    return 'Your Order Have been received';
  }
}
