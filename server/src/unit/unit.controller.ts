import {
  Controller,
  Post,
  Get,
  Delete,
  Patch,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';

import { UnitService } from './unit.service';

export interface IUnit {
  name: string;
}

import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from '../auth/decorator/roles.decorator';
import { RolesGuard } from '../auth/guard/roles.guard';
import { Role } from '../generated/prisma/client';

@ApiTags('Unit')
@Controller('unit')
export class UnitController {
  constructor(private unitService: UnitService) {}

  @Post('add')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Add a new unit' })
  @ApiResponse({ status: 201, description: 'Unit successfully created.' })
  addUnit(@Body() dto: IUnit) {
    return this.unitService.addUnit(dto);
  }

  @Get('getAll')
  @ApiOperation({ summary: 'Get all units' })
  @ApiResponse({ status: 200, description: 'Return all units.' })
  getAllUnits() {
    return this.unitService.getUnits();
  }

  @Get('get/:id')
  @ApiOperation({ summary: 'Get a single unit by ID' })
  @ApiResponse({ status: 200, description: 'Return the unit.' })
  @ApiResponse({ status: 404, description: 'Unit not found.' })
  getSingleUnit(@Param('id') id: string) {
    return this.unitService.getSingleUnit(id);
  }

  @Patch('edit/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Edit a unit' })
  @ApiResponse({ status: 200, description: 'Unit successfully updated.' })
  editUnit(@Body() dto: IUnit, @Param('id') id: string) {
    return this.unitService.editUnit(dto, id);
  }

  @Delete('delete/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete a unit' })
  @ApiResponse({ status: 200, description: 'Unit successfully deleted.' })
  deleteUnit(@Param('id') id: string) {
    return this.unitService.deleteUnit(id);
  }
}
