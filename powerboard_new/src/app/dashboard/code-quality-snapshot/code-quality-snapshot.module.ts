import { Module } from '@nestjs/common';
import { CodeQualitySnapshot } from './model/entities/code-quality-snapshot.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CodeQualitySnapshotCrudService } from './services/code-quality-snapshot.crud.service';
import { CodeQualitySnapshotCrudController } from './controllers/code-quality-snapshot.crud.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CodeQualitySnapshot])],
  providers: [CodeQualitySnapshotCrudService],
  controllers: [CodeQualitySnapshotCrudController],
  exports: [CodeQualitySnapshotCrudService],
})
export class CodeQualitySnapshotModule {}
