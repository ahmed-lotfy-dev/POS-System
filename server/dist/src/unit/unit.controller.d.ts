import { UnitService } from './unit.service';
export interface IUnit {
    name: string;
}
export declare class UnitController {
    private unitService;
    constructor(unitService: UnitService);
    addUnit(dto: IUnit): Promise<import("@nestjs/common").ConflictException | {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }>;
    getAllUnits(): Promise<{
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
