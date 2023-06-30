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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CategoryService = exports.CategoryService = class CategoryService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async addCategory(dto) {
        try {
            const existed = await this.prisma.category.findUnique({
                where: { name: dto.name },
            });
            console.log(existed);
            if (existed) {
                throw new common_1.ConflictException('Category already exist');
            }
            const newCategory = await this.prisma.category.create({
                data: { name: dto.name },
            });
            return newCategory;
        }
        catch (error) {
            return new common_1.ConflictException(error.message);
        }
    }
    async getCategories() {
        const categories = await this.prisma.category.findMany();
        console.log(categories);
        return categories;
    }
    async getSingleCategory(id) {
        const singleCategory = await this.prisma.category.findFirst({
            where: { id },
        });
        if (!singleCategory)
            return { msg: 'category not found' };
        return singleCategory;
    }
    async editCategory(dto, id) {
        console.log(id);
        const updatedCategory = await this.prisma.category.update({
            where: { id },
            data: { name: dto.name },
        });
        if (!updatedCategory)
            return { msg: 'category not found' };
        console.log(id);
        return updatedCategory;
    }
    async deleteCategory(id) {
        const deletedCategory = await this.prisma.category.delete({
            where: { id },
        });
        if (!deletedCategory)
            return { msg: 'category not found' };
        console.log(id);
        return deletedCategory;
    }
};
__decorate([
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoryService.prototype, "addCategory", null);
__decorate([
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CategoryService.prototype, "getSingleCategory", null);
__decorate([
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], CategoryService.prototype, "editCategory", null);
__decorate([
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CategoryService.prototype, "deleteCategory", null);
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CategoryService);
//# sourceMappingURL=category.service.js.map