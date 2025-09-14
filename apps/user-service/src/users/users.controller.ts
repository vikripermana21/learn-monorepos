import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import {
  CreateUserDto,
  UpdateUserDto,
  USER_SERVICE_PATTERNS,
} from 'libs/common/src';
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @MessagePattern(USER_SERVICE_PATTERNS.CREATE_USER)
  create(@Payload() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @MessagePattern(USER_SERVICE_PATTERNS.GET_ALL_USERS)
  findAll() {
    return this.usersService.findAll();
  }

  @MessagePattern(USER_SERVICE_PATTERNS.GET_USER)
  findOne(@Payload() id: string) {
    return this.usersService.findOne(id);
  }

  @MessagePattern(USER_SERVICE_PATTERNS.UPDATE_USER)
  update(@Payload() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto);
  }

  @MessagePattern(USER_SERVICE_PATTERNS.DELETE_USER)
  remove(@Payload() id: string) {
    return this.usersService.remove(id);
  }
}
