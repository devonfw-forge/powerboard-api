import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ADCenterCrudController } from './controllers/ad-center.crud.controller';
import { ADCenter } from './model/entities/ad-center.entity';
import { ADCenterCrudService } from './services/ad-center.crud.service';

@Module({
  imports: [TypeOrmModule.forFeature([ADCenter])],
  providers: [ADCenterCrudService],
  controllers: [ADCenterCrudController],
  exports: [ADCenterCrudService],
})
export class ADCenterModule {}
