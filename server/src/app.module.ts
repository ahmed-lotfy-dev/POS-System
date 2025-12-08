import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

import { AuthModule } from './auth/auth.module';
import { JwtGuard } from './auth/guard/jwt.guard';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { UnitModule } from './unit/unit.module';
import { UserModule } from './user/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { UploadModule } from './upload/upload.module';
import { OrderModule } from './order/order.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    CategoryModule,
    ProductModule,
    UnitModule,
    UserModule,
    PrismaModule,
    UploadModule,
    OrderModule,
    DashboardModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
  controllers: [],
})
export class AppModule {}
