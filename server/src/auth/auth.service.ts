import { ForbiddenException, Injectable, Req } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: AuthDto) {
    try {
      const hash = await argon.hash(dto.password);
      const isExisted = await this.prisma.user.findFirst({
        where: { email: dto.email },
      });
      if (isExisted) return { msg: 'User already exist' };

      const user = await this.prisma.user.create({
        data: { email: dto.email, password: hash },
      });

      return this.signInToken(
        user.id,
        user.email,
        user.username,
        user.isAdmin,
        user.isConfirm,
      );
    } catch (error) {
      throw error;
    }
  }

  async signin(dto: AuthDto) {
    // find user from db
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) throw new ForbiddenException('Wrong Credentials');

    const pwMatches = await argon.verify(user.password, dto.password);
    if (!pwMatches) throw new ForbiddenException('Wrong Credentials');

    return this.signInToken(
      user.id,
      user.email,
      user.username,
      user.isAdmin,
      user.isConfirm,
    );
   }

  signInToken(
    userId: number,
    email: string,
    username: string,
    isAdmin: string,
    isConfirm: boolean,
  ): Promise<string> {
    const payload = {
      sub: userId,
      email,
      username,
      isAdmin,
      isConfirm,
    };

    const secret = this.config.get('JWT_SECRET');

    return this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret,
    });
  }
}
