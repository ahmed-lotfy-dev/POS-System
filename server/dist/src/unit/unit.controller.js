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
exports.UnitController = void 0;
const common_1 = require("@nestjs/common");
const unit_service_1 = require("./unit.service");
const swagger_1 = require("@nestjs/swagger");
const roles_decorator_1 = require("../auth/decorator/roles.decorator");
const roles_guard_1 = require("../auth/guard/roles.guard");
const client_1 = require("../generated/prisma/client");
let UnitController = class UnitController {
    unitService;
    constructor(unitService) {
        this.unitService = unitService;
    }
    addUnit(dto) {
        return this.unitService.addUnit(dto);
    }
    getAllUnits() {
        return this.unitService.getUnits();
    }
    getSingleUnit(id) {
        return this.unitService.getSingleUnit(id);
    }
    editUnit(dto, id) {
        return this.unitService.editUnit(dto, id);
    }
    deleteUnit(id) {
        return this.unitService.deleteUnit(id);
    }
};
exports.UnitController = UnitController;
__decorate([
    (0, common_1.Post)('add'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Add a new unit' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Unit successfully created.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UnitController.prototype, "addUnit", null);
__decorate([
    (0, common_1.Get)('getAll'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all units' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all units.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UnitController.prototype, "getAllUnits", null);
__decorate([
    (0, common_1.Get)('get/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a single unit by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return the unit.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Unit not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UnitController.prototype, "getSingleUnit", null);
__decorate([
    (0, common_1.Patch)('edit/:id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Edit a unit' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Unit successfully updated.' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], UnitController.prototype, "editUnit", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a unit' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Unit successfully deleted.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UnitController.prototype, "deleteUnit", null);
exports.UnitController = UnitController = __decorate([
    (0, swagger_1.ApiTags)('Unit'),
    (0, common_1.Controller)('unit'),
    __metadata("design:paramtypes", [unit_service_1.UnitService])
], UnitController);
//# sourceMappingURL=unit.controller.js.map