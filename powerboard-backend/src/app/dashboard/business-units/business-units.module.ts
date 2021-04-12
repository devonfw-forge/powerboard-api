import { Module } from '@nestjs/common';
import { BusinessUnit } from './model/entities/business-unit.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessUnitCrudService } from './services/business-unit.crud.service';
import { BusinessUnitCrudController } from './controllers/business-unit.crud.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BusinessUnit])],
  providers: [BusinessUnitCrudService],
  controllers: [BusinessUnitCrudController],
})
export class BusinessUnitsModule {}
