import { UnitService } from './unit.service';
export interface IUnit {
    name: string;
}
export declare class UnitController {
    private unitService;
    constructor(unitService: UnitService);
    addUnit(dto: IUnit): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    } | import("@nestjs/common").ConflictException>;
    getAllUnits(): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getSingleUnit(id: number): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    } | {
        msg: string;
    }>;
    editUnit(dto: IUnit, id: number): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    } | {
        msg: string;
    }>;
    deleteUnit(id: number): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    } | {
        msg: string;
    }>;
}
