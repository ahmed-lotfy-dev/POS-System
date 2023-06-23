import { PrismaService } from 'src/prisma/prisma.service';
import { IUnit } from './unit.controller';
export declare class UnitService {
    private prisma;
    constructor(prisma: PrismaService);
    addUnit(dto: IUnit): Promise<import("@prisma/client").Unit>;
    getUnits(): Promise<import("@prisma/client").Unit[]>;
    getSingleUnit(id: number): Promise<import("@prisma/client").Unit | {
        msg: string;
    }>;
    editUnit(dto: IUnit, id: number): Promise<import("@prisma/client").Unit | {
        msg: string;
    }>;
    deleteUnit(id: number): Promise<import("@prisma/client").Unit | {
        msg: string;
    }>;
}
