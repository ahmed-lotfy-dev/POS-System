import { UnitService } from './unit.service';
export interface IUnit {
    name: string;
}
export declare class UnitController {
    private unitService;
    constructor(unitService: UnitService);
    addUnit(dto: IUnit): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    } | import("@nestjs/common").ConflictException>;
    getAllUnits(): Promise<{
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
