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
      ['pending'],
    );
  }

  getOrdersIDs() {
    return this.ordersRepository.query(
      "SELECT DISTINCT order_id from orders WHERE status = 'pending'",
    );
  }

  async finishOrder(orderID: string) {
    return await this.ordersRepository.query(
      "UPDATE orders SET status = 'done' WHERE order_id = ?",
      [orderID],
    );
  }

  async insertOrders(body: any) {
    const orderID = `#${Math.floor(Math.random() * 1000)}`;
    const { data, customerNumber } = body;
    for (const { name, count, price } of data) {
      await this.ordersRepository.query(
        'INSERT INTO orders (name, count, order_id, number, status, price) VALUES (?, ?, ?, ?, ?, ?)',
        [name, count, orderID, customerNumber, 'pending', price],
      );
    }

    this.ordersGateway?.server.emit('new order', data, orderID);

    return 'Your Order Have been received';
  }

  async getOrdersCount() {
    return await this.ordersRepository.query(
      "SELECT count(DISTINCT order_id) from orders WHERE status = 'done'",
    );
  }

  async getOrdersItems() {
    return await this.ordersRepository.query(
      "SELECT count(name) from orders Where status = 'done'",
    );
  }

  async getFinishedOrders() {
    return await this.ordersRepository.query(
      "SELECT `count`, price from orders WHERE status = 'done'",
    );
  }
}
