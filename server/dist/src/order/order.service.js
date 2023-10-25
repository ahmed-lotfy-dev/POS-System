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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let OrderService = class OrderService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createOrder(dto) {
        const createdOrder = await this.prisma.order.create({
            data: {
                ...dto.orderData,
                items: {
                    create: dto.orderItems.map((item) => ({
                        ...item,
                        orderId: item.orderId,
                        productId: item.productId,
                    })),
                },
            },
        });
        return createdOrder;
    }
    async getAllOrders() {
        const orders = await this.prisma.order.findMany();
        console.log(orders);
        return orders;
    }
    async getSingleOrder(id) {
        const singleOrder = await this.prisma.order.findFirst({
            where: { id },
        });
        if (!singleOrder)
            return { msg: 'order not found' };
        return singleOrder;
    }
    async editOrder(dto, id) {
        try {
            const updatedOrder = await this.prisma.order.update({
                where: { id },
                data: {},
            });
            console.log({ updatedOrder });
            if (!updatedOrder)
                return { msg: 'Product not found' };
            return updatedOrder;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    async deleteOrder(id) {
        const deletedOrder = await this.prisma.order.delete({
            where: { id },
        });
        if (!deletedOrder)
            return { msg: 'product not found' };
        return deletedOrder;
    }
};
exports.OrderService = OrderService;
__decorate([
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderService.prototype, "getSingleOrder", null);
__decorate([
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], OrderService.prototype, "editOrder", null);
__decorate([
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderService.prototype, "deleteOrder", null);
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrderService);
//# sourceMappingURL=order.service.js.map