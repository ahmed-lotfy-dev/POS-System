import { ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IUnit } from './unit.controller';
export declare class UnitService {
    private prisma;
    constructor(prisma: PrismaService);
    addUnit(dto: IUnit): Promise<ConflictException | {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getUnits(): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getSingleUnit(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    } | {
        msg: string;
    }>;
    editUnit(dto: IUnit, id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    } | {
        msg: string;
    }>;
    deleteUnit(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    } | {
        msg: string;
    }>;
}
