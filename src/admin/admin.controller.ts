import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { RolesGuard } from '../common/guards/roles.guard';
import { User } from '../users/user.schema';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('admin')
@UseGuards(RolesGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('users')
  @Roles('Admin')
  async getAllUsers(): Promise<User[]> {
    return this.adminService.getAllUsers();
  }

  @Delete('users/:id')
  @Roles('Admin')
  async deleteUser(@Param('id') id: string): Promise<void|null> {
    return this.adminService.deleteUser(id);
  }
}