import { Body, Controller, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  async insertOrder(@Body() body: any): Promise<string> {
    return this.ordersService.insertOrders(body)
  }
}
