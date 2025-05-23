import { UnitService } from './unit.service';
export interface IUnit {
    name: string;
}
export declare class UnitController {
    private unitService;
    constructor(unitService: UnitService);
    addUnit(dto: IUnit): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    } | import("@nestjs/common").ConflictException>;
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
