"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let UnitService = class UnitService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async addUnit(dto) {
        try {
            const existed = await this.prisma.unit.findUnique({
                where: { name: dto.name },
            });
            console.log(existed);
            if (existed) {
                throw new common_1.ConflictException('Unit already exist');
            }
            const newUnit = await this.prisma.unit.create({
                data: { ...dto },
            });
            return newUnit;
        }
        catch (error) {
            return new common_1.ConflictException(error.message);
        }
    }
    async getUnits() {
        const units = await this.prisma.unit.findMany();
        console.log(units);
        return units;
    }
    async getSingleUnit(id) {
        const singleUnit = await this.prisma.unit.findFirst({
            where: { id },
        });
        if (!singleUnit)
            return { msg: 'unit not found' };
        return singleUnit;
    }
    async editUnit(dto, id) {
        const updatedUnit = await this.prisma.unit.update({
            where: { id },
            data: { ...dto },
        });
        if (!updatedUnit)
            return { msg: 'unit not found' };
        console.log(id);
        return updatedUnit;
    }
    async deleteUnit(id) {
        const deletedUnit = await this.prisma.unit.delete({
            where: { id },
        });
        if (!deletedUnit)
            return { msg: 'unit not found' };
        return deletedUnit;
    }
};
exports.UnitService = UnitService;
__decorate([
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UnitService.prototype, "addUnit", null);
__decorate([
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UnitService.prototype, "getSingleUnit", null);
__decorate([
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UnitService.prototype, "editUnit", null);
__decorate([
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UnitService.prototype, "deleteUnit", null);
exports.UnitService = UnitService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UnitService);
//# sourceMappingURL=unit.service.js.map