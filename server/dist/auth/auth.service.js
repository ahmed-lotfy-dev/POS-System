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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const argon = require("argon2");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let AuthService = exports.AuthService = class AuthService {
    constructor(prisma, jwt, config) {
        this.prisma = prisma;
        this.jwt = jwt;
        this.config = config;
    }
    async signup(dto) {
        try {
            const hash = await argon.hash(dto.password);
            const isExisted = await this.prisma.user.findFirst({
                where: { email: dto.email },
            });
            if (isExisted)
                return { msg: 'User already exist' };
            const user = await this.prisma.user.create({
                data: { email: dto.email, password: hash },
            });
            return this.signToken(user.id, user.email, user.username, user.isAdmin, user.isConfirm);
        }
        catch (error) {
            throw error;
        }
    }
    async signin(dto) {
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (!user)
            throw new common_1.ForbiddenException('Wrong Credentials');
        const pwMatches = await argon.verify(user.password, dto.password);
        if (!pwMatches)
            throw new common_1.ForbiddenException('Wrong Credentials');
        return this.signToken(user.id, user.email, user.username, user.isAdmin, user.isConfirm);
    }
    async signToken(userId, email, username, isAdmin, isConfirm) {
        const payload = {
            sub: userId,
            email,
            username,
            isAdmin,
            isConfirm,
        };
        const secret = this.config.get('JWT_SECRET');
        const token = await this.jwt.signAsync(payload, {
            expiresIn: '15m',
            secret: secret,
        });
        return {
            access_token: token,
        };
    }
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map