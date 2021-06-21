import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamsModule } from '../../teams/teams.module';
import { ImagesCrudController } from './controllers/images.crud.controller';
import { Images } from './model/entities/image.entity';
import { ImagesCrudService } from './services/images.crud.service';

@Module({
  imports: [TypeOrmModule.forFeature([Images]), forwardRef(() => TeamsModule)],
  providers: [ImagesCrudService],
  controllers: [ImagesCrudController],
  exports: [ImagesCrudService],
})
export class ImagesModule {}
