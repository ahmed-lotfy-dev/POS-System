import {
  Controller,
  Post,
  Get,
  Delete,
  Patch,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';

import { UnitService } from './unit.service';

export interface IUnit {
  name: string;
}

@Controller('unit')
export class UnitController {
  constructor(private unitService: UnitService) {}

  @Post('add')
  addUnit(@Body() dto: IUnit) {
    return this.unitService.addUnit(dto);
  }

  @Get('getAll')
  getAllUnits() {
    return this.unitService.getUnits();
  }

  @Get('get/:id')
  getSingleUnit(@Param('id', ParseIntPipe) id: number) {
    return this.unitService.getSingleUnit(id);
  }

  @Patch('edit/:id')
  editUnit(@Body() dto: IUnit, @Param('id', ParseIntPipe) id: number) {
    return this.unitService.editUnit(dto, id);
  }

  @Delete('delete/:id')
  deleteUnit(@Param('id', ParseIntPipe) id: number) {
    return this.unitService.deleteUnit(id);
  }
}
