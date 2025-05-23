import { ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IUnit } from './unit.controller';
export declare class UnitService {
    private prisma;
    constructor(prisma: PrismaService);
    addUnit(dto: IUnit): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    } | ConflictException>;
    getUnits(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }[]>;
    getSingleUnit(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    } | {
        msg: string;
    }>;
    editUnit(dto: IUnit, id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    } | {
        msg: string;
    }>;
    deleteUnit(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    } | {
        msg: string;
    }>;
}
