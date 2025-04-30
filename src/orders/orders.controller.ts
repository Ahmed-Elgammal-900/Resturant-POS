import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  async insertOrder(@Body() body: any): Promise<string> {
    return this.ordersService.insertOrders(body);
  }

  @Get()
  async getOrders() {
    const orderIDs = await this.ordersService.getOrdersIDs();
    const orders = await this.ordersService.getOrders();

    const body = { orderIDs: orderIDs, orders: orders };
    return body;
  }

  @Post('finishOrder')
  handleFinishOrder(@Body('order_id') orderID: string) {
    return this.ordersService.finishOrder(orderID);
  }

  @Get('orders-count')
  async handleOrdersCount() {
    return this.ordersService.getOrdersCount()
  }

  @Get('orders-items')
  async handleOrdersItems(){
    return this.ordersService.getOrdersItems()
  }
}
