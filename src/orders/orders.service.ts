import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Orders } from './orders.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Orders) private ordersRepository: Repository<Orders>,
  ) {}

  insertOrders(data: any) {
    const orderID = `#${Math.floor(Math.random() * 1000)}`;
    data.forEach(({ name, count }) => {
      this.ordersRepository.query(
        'INSERT INTO orders (name, count, order_id) VALUES (?, ?, ?)',
        [name, count, orderID],
      );
    });

    return 'Your Order Have been received';
  }
}
