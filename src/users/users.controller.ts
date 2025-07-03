import { Controller, Get, Post, Body, Param, Put, Delete, Request, UnauthorizedException, UseGuards, ForbiddenException } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.schema';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async create(@Body() createUserDto: any): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Roles('Admin', 'User', 'Manager')
  @UseGuards(AuthGuard('jwt'))
  async findAll(@Request() req): Promise<User[]> {
    console.log(req?.user)
    if (req?.user?.role === "Admin") {
      return this.usersService.findAll();
    }
    if (req?.user?.role === "User") {
      const user = await this.usersService.findById(req.user.userId);
      return user ? [user] : [];
    }
        if (req?.user?.role === "Manager") {
      const user = await this.usersService.findById(req.user.userId);
      return user ? [user] : [];
    }
    console.log(req?.user)
    throw new ForbiddenException("Not allowed to access!");
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @Roles('Admin', 'User', 'Manager')
  async findOne(@Param('id') id: string, @Request() req): Promise<User | null> {
    if (req?.user?.role === "Admin") {
      return this.usersService.findById(id);
    }
    if (req?.user?.role === "Manager") {
      return this.usersService.findById(id);
    }
    if (req?.user?.role === "User") {
      const user = await this.usersService.findById(req.user.userId);
      if (id == user?._id) {
        return user ? user : null;
      }
      else {
        throw new ForbiddenException("You can not access another users details")
      }
    }
    console.log(req?.user)
    throw new ForbiddenException("Not allowed to access!");
    return this.usersService.findById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @Roles('Admin', 'Manager')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User | null> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @Roles('Admin')
  async delete(@Param('id') id: string,@Request() req): Promise<void | null> {
    if (req?.user?.role === "Admin") {
      this.usersService.remove(id);
      // this.usersService.findAll();
    }
    throw new ForbiddenException('Not allow to delete '+req?.user?.role)
    return
  }
}