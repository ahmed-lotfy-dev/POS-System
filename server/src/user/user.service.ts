import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getallusers() {
    const users = await this.prisma.user.findMany();
    return { msg: 'Users Fetched Successfully', users };
  }
}
