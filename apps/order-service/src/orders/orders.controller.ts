import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrdersService } from './orders.service';
import {
  CreateOrderDto,
  ORDER_SERVICE_PATTERNS,
  UpdateOrderStatusDto,
} from 'libs/common/src';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @MessagePattern(ORDER_SERVICE_PATTERNS.CREATE_ORDER)
  create(@Payload() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @MessagePattern(ORDER_SERVICE_PATTERNS.GET_ORDER)
  findAll() {
    return this.ordersService.findAll();
  }

  @MessagePattern(ORDER_SERVICE_PATTERNS.GET_USER_ORDERS)
  findOne(@Payload() id: string) {
    return this.ordersService.findOne(id);
  }

  @MessagePattern(ORDER_SERVICE_PATTERNS.UPDATE_ORDER_STATUS)
  update(@Payload() updateOrderDto: UpdateOrderStatusDto) {
    return this.ordersService.update(updateOrderDto);
  }
}
