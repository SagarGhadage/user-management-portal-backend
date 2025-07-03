import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.schema';
import { UpdateUserDto } from '../users/dto/update-user.dto';

@Injectable()
export class AdminService {
  constructor(private readonly usersService: UsersService) {}

  async getAllUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  async getUserById(userId: string): Promise<User|null> {
    return this.usersService.findById(userId);
  }
  async updateUser(userId: string, updateData: UpdateUserDto): Promise<User|null> {
    return this.usersService.update(userId, updateData);
  }

  async deleteUser(userId: string): Promise<void|null> {
    await this.usersService.remove(userId);
    return null;
  }
}