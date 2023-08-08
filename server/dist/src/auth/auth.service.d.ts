import { PrismaService } from '../prisma/prisma.service';
import { SignUpAuth, SignInAuth } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private prisma;
    private jwt;
    private config;
    constructor(prisma: PrismaService, jwt: JwtService, config: ConfigService);
    signup(dto: SignUpAuth): Promise<{
        access_token: string;
    } | {
        msg: string;
    }>;
    signin(dto: SignInAuth): Promise<{
        access_token: string;
    }>;
    signToken(userId: string, email: string, username: string, isAdmin: boolean, isConfirm: boolean, createdAt: Date, updatedAt: Date): Promise<{
        access_token: string;
    }>;
}
