import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import {
  CreateOrderDto,
  OrderResponseDto,
  OrderStatus,
  UpdateOrderStatusDto,
} from 'libs/common/src';

@Injectable()
export class OrdersService {
  private orders: OrderResponseDto[] = [];
  private idCounter: number = 1;

  create(createOrderDto: CreateOrderDto) {
    const order: OrderResponseDto = {
      id: this.idCounter.toString(),
      userId: createOrderDto.userId,
      productName: createOrderDto.productName,
      price: createOrderDto.price,
      quantity: createOrderDto.quantity,
      status: OrderStatus.PENDING,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.orders.push(order);
    this.idCounter++;
    return order;
  }

  findAll() {
    return this.orders;
  }

  findOne(id: string) {
    const order = this.orders.find((o) => o.id === id);
    return order;
  }

  update(updateOrderDto: UpdateOrderStatusDto) {
    return `This action updates a ${updateOrderDto.status} order`;
  }

  remove(id: string) {
    return `This action removes a #${id} order`;
  }
}
