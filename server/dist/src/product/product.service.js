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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProductService = class ProductService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async addProduct(dto, code, price) {
        const newProduct = await this.prisma.product.create({
            data: { ...dto, code, price },
        });
        console.log(dto);
        return newProduct;
    }
    async getAllProducts() {
        const products = await this.prisma.product.findMany();
        console.log(products);
        return products;
    }
    async getSingleProduct(id) {
        console.log(id);
        const singleProduct = await this.prisma.product.findFirst({
            where: { id },
        });
        console.log(singleProduct);
        if (!singleProduct)
            return { msg: 'product not found' };
        return singleProduct;
    }
    async editProduct(dto, id) {
        try {
            console.log(id);
            const updatedProduct = await this.prisma.product.update({
                where: { id },
                data: {
                    name: dto.name,
                    code: dto.code,
                    price: dto.price,
                    image: dto.image,
                    categoryId: dto.categoryId,
                    unitId: dto.unitId,
                },
            });
            console.log({ updatedProduct });
            if (!updatedProduct)
                return { msg: 'Product not found' };
            return updatedProduct;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    async deleteProduct(id) {
        const deletedProduct = await this.prisma.product.delete({
            where: { id },
        });
        if (!deletedProduct)
            return { msg: 'product not found' };
        return deletedProduct;
    }
};
exports.ProductService = ProductService;
__decorate([
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], ProductService.prototype, "addProduct", null);
__decorate([
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductService.prototype, "getSingleProduct", null);
__decorate([
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ProductService.prototype, "editProduct", null);
__decorate([
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductService.prototype, "deleteProduct", null);
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductService);
//# sourceMappingURL=product.service.js.map