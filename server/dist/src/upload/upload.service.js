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
exports.UploadService = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const uuid_1 = require("uuid");
let UploadService = class UploadService {
    constructor(config) { }
    async uploadImage(s3, image) {
        const id = (0, uuid_1.v4)();
        if (!image)
            throw new Error('No Image Provided');
        console.log(image);
        try {
            const uploadedImage = await s3.send(new client_s3_1.PutObjectCommand({
                Bucket: 'pos-system',
                Key: `${id}-${image.originalname}`,
                Body: image.buffer,
                ContentType: image.mimetype,
                ACL: 'public-read',
            }));
            const imageUrl = `${process.env.CF_IMAGES_SUBDOMAIN}/${id}-${image.originalname}`;
            console.log({ uploadedImage });
            console.log({ imageUrl });
            return { image: imageUrl };
        }
        catch (error) {
            console.log(error);
            throw new Error('Failed To Upload Image');
        }
    }
    async deleteImage(s3, dto) {
        const image = dto.image;
        console.log(image);
        if (!image)
            throw new Error('No Image Provided');
        const filePathname = image.split(process.env.CF_IMAGES_SUBDOMAIN)[1];
        console.log(filePathname);
        try {
            const deletedImage = await s3.send(new client_s3_1.DeleteObjectCommand({
                Bucket: 'pos-system',
                Key: filePathname,
            }));
            console.log(deletedImage);
            return { msg: 'Image Deleted Successfully' };
        }
        catch (error) {
            throw new Error('Failed To Delete Image');
        }
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], UploadService);
//# sourceMappingURL=upload.service.js.map