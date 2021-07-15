import { Module } from '@nestjs/common';
import { CodeQualitySnapshot } from './model/entities/code-quality-snapshot.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CodeQualitySnapshotCrudService } from './services/code-quality-snapshot.crud.service';
import { CodeQualitySnapshotCrudController } from './controllers/code-quality-snapshot.crud.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CodeQualitySnapshot])],
  //providers: [CodeQualitySnapshotCrudService],
  providers: [
    {
      provide: 'ICodeQualityService',
      useClass: CodeQualitySnapshotCrudService,
    },
  ],
  controllers: [CodeQualitySnapshotCrudController],
  exports: ['ICodeQualityService'],
})
export class CodeQualitySnapshotModule {}
