import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private prisma;
    private jwt;
    private config;
    constructor(prisma: PrismaService, jwt: JwtService, config: ConfigService);
    signup(dto: AuthDto): Promise<string | {
        msg: string;
    }>;
    signin(dto: AuthDto): Promise<string>;
    signInToken(userId: number, email: string, username: string, isAdmin: string, isConfirm: boolean): Promise<string>;
}
