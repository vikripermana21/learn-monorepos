import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from 'libs/common/src';

@Injectable()
export class UsersService {
  private users: UserResponseDto[] = [];
  private idCounter = 1;

  create(createUserDto: CreateUserDto) {
    const user: UserResponseDto = {
      id: this.idCounter.toString(),
      name: createUserDto.name,
      email: createUserDto.email,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.push(user);
    this.idCounter++;

    return user;
  }

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    const user = this.users.find((o) => o.id == id);
    return user;
  }

  update(updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    return `This action updates a #${updateUserDto.email} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
