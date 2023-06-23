import { UnitService } from './unit.service';
export interface IUnit {
    name: string;
}
export declare class UnitController {
    private unitService;
    constructor(unitService: UnitService);
    addUnit(dto: IUnit): Promise<import("@prisma/client").Unit>;
    getAllUnits(): Promise<import("@prisma/client").Unit[]>;
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
