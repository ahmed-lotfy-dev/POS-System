import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private prisma;
    constructor(config: ConfigService, prisma: PrismaService);
    validate(payload: {
        sub: number;
        email: string;
    }): Promise<{
        id: number;
        username: string;
        email: string;
        password: string;
        isAdmin: boolean;
        isConfirm: boolean;
        forgetCode: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
export {};
