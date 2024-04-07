import {
  Body,
  ConflictException,
  Injectable,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IUnit } from './unit.controller';

@Injectable()
export class UnitService {
  constructor(private prisma: PrismaService) {}

  async addUnit(@Body() dto: IUnit) {
    try {
      const existed = await this.prisma.unit.findUnique({
        where: { name: dto.name },
      });
      console.log(existed);
      if (existed) {
        throw new ConflictException('Unit already exist');
      }

      const newUnit = await this.prisma.unit.create({
        data: { name: dto.name },
      });

      return newUnit;
    } catch (error) {
      return new ConflictException(error.message);
    }
  }

  async getUnits() {
    const units = await this.prisma.unit.findMany();

    console.log(units);
    return units;
  }

  async getSingleUnit(@Param('id') id: string) {
    const singleUnit = await this.prisma.unit.findFirst({
      where: { id },
    });
    if (!singleUnit) return { msg: 'unit not found' };

    return singleUnit;
  }

  async editUnit(@Body() dto: IUnit, @Param('id') id: string) {
    const updatedUnit = await this.prisma.unit.update({
      where: { id },
      data: { name: dto.name },
    });

    if (!updatedUnit) return { msg: 'unit not found' };
    console.log(id);

    return updatedUnit;
  }

  async deleteUnit(@Param('id') id: string) {
    const deletedUnit = await this.prisma.unit.delete({
      where: { id },
    });

    if (!deletedUnit) return { msg: 'unit not found' };

    return deletedUnit;
  }
}
