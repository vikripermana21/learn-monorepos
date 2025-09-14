import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { AppService } from './app.service';
import {
  CreateUserDto,
  SERVICES,
  USER_SERVICE_PATTERNS,
} from 'libs/common/src';
import { ClientProxy } from '@nestjs/microservices';

@Controller('users')
export class AppController {
  constructor(
    @Inject(SERVICES.USER_SERVICE)
    private readonly userService: ClientProxy
  ) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.send(
      USER_SERVICE_PATTERNS.CREATE_USER,
      createUserDto
    );
  }

  @Get()
  getData() {
    return this.userService.send(USER_SERVICE_PATTERNS.GET_ALL_USERS, {});
  }
}
