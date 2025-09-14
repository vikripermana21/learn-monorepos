import {
  IsString,
  IsNumber,
  IsUUID,
  IsEnum,
  IsOptional,
} from 'class-validator';

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

export class CreateOrderDto {
  @IsUUID()
  userId: string;

  @IsString()
  productName: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;
}

export class UpdateOrderStatusDto {
  @IsEnum(OrderStatus)
  status: OrderStatus;
}

export class OrderResponseDto {
  id: string;
  userId: string;
  productName: string;
  quantity: number;
  price: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}
