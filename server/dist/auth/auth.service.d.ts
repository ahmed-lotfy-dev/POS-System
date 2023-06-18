import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private prisma;
    private jwt;
    private config;
    constructor(prisma: PrismaService, jwt: JwtService, config: ConfigService);
    signup(dto: AuthDto): Promise<{
        access_token: string;
    } | {
        msg: string;
    }>;
    signin(dto: AuthDto): Promise<{
        access_token: string;
    }>;
    signToken(userId: number, email: string, username: string, isAdmin: boolean, isConfirm: boolean, createdAt: Date, updatedAt: Date): Promise<{
        access_token: string;
    }>;
}
