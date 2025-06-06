import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private prisma;
    constructor(config: ConfigService, prisma: PrismaService);
    validate(payload: {
        sub: string;
        email: string;
    }): Promise<{
        id: string;
        username: string | null;
        email: string;
        password: string;
        isAdmin: boolean;
        isConfirm: boolean | null;
        forgetCode: number | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
export {};
