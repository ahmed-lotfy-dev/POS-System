import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('all')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users.' })
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @UseGuards(JwtGuard)
  @Get('me')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ status: 200, description: 'Return current user profile.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  getMe(@GetUser() user: User) {
    return user;
  }

  @UseGuards(JwtGuard)
  @Patch()
  @ApiOperation({ summary: 'Edit current user profile' })
  @ApiResponse({
    status: 200,
    description: 'User profile successfully updated.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  editUser(@GetUser('id') userId: string, @Body() dto: EditUserDto) {
    return this.userService.editUser(userId, dto);
  }
}
