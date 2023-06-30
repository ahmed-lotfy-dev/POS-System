"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadModule = void 0;
const common_1 = require("@nestjs/common");
const upload_service_1 = require("./upload.service");
const upload_controller_1 = require("./upload.controller");
const aws_sdk_v3_nest_1 = require("aws-sdk-v3-nest");
const client_s3_1 = require("@aws-sdk/client-s3");
let UploadModule = exports.UploadModule = class UploadModule {
};
exports.UploadModule = UploadModule = __decorate([
    (0, common_1.Module)({
        imports: [
            aws_sdk_v3_nest_1.AwsSdkModule.register({
                client: new client_s3_1.S3Client({
                    region: 'auto',
                    endpoint: `https://${process.env.CF_ACCOUNT_ID}.r2.cloudflarestorage.com`,
                    credentials: {
                        accessKeyId: process.env.CF_ACCESS_KEY_ID,
                        secretAccessKey: process.env.CF_SECRET_ACCESS_KEY,
                    },
                }),
            }),
        ],
        controllers: [upload_controller_1.UploadController],
        providers: [upload_service_1.UploadService],
    })
], UploadModule);
//# sourceMappingURL=upload.module.js.map