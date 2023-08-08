import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignUpAuth, SignInAuth } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: SignUpAuth) {
    try {
      const hash = await argon.hash(dto.password);
      const isExisted = await this.prisma.user.findFirst({
        where: { email: dto.email },
      });
      if (isExisted) return { msg: 'User already exist' };

      const user = await this.prisma.user.create({
        data: { username: dto.username, email: dto.email, password: hash },
      });
      console.log(user);

      return this.signToken(
        user.id,
        user.email,
        user.username,
        user.isAdmin,
        user.isConfirm,
        user.createdAt,
        user.updatedAt,
      );
    } catch (error) {
      throw error;
    }
  }

  async signin(dto: SignInAuth) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) throw new ForbiddenException('Wrong Credentials');

    const pwMatches = await argon.verify(user.password, dto.password);
    if (!pwMatches) throw new ForbiddenException('Wrong Credentials');

    return this.signToken(
      user.id,
      user.email,
      user.username,
      user.isAdmin,
      user.isConfirm,
      user.createdAt,
      user.updatedAt,
    );
  }

  async signToken(
    userId: string,
    email: string,
    username: string,
    isAdmin: boolean,
    isConfirm: boolean,
    createdAt: Date,
    updatedAt: Date,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
      username,
      isAdmin,
      isConfirm,
      createdAt,
      updatedAt,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
}
