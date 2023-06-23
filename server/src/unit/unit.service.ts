import { Body, Injectable, Param, ParseIntPipe } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IUnit } from './unit.controller';

@Injectable()
export class UnitService {
  constructor(private prisma: PrismaService) {}

  async addUnit(@Body() dto: IUnit) {
    const newUnit = await this.prisma.unit.create({
      data: { ...dto },
    });

    console.log(dto.name);
    return newUnit;
  }

  async getUnits() {
    const units = await this.prisma.unit.findMany();

    console.log(units);
    return units;
  }

  async getSingleUnit(@Param('id', ParseIntPipe) id: number) {
    const singleUnit = await this.prisma.unit.findFirst({
      where: { id },
    });
    if (!singleUnit) return { msg: 'unit not found' };

    return singleUnit;
  }

  async editUnit(@Body() dto: IUnit, @Param('id', ParseIntPipe) id: number) {
    const updatedUnit = await this.prisma.unit.update({
      where: { id },
      data: { ...dto },
    });

    if (!updatedUnit) return { msg: 'unit not found' };
    console.log(id);

    return updatedUnit;
  }

  async deleteUnit(@Param('id', ParseIntPipe) id: number) {
    const deletedUnit = await this.prisma.unit.delete({
      where: { id },
    });

    if (!deletedUnit) return { msg: 'unit not found' };

    return deletedUnit;
  }
}
