import { Module } from '@nestjs/common';
import { TeamSpirit } from './model/entities/team-spirit.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamSpiritCrudService } from './services/team-spirit.crud.service';
import { TeamSpiritCrudController } from './controllers/team-spirit.crud.controller';
import { Sprint } from '../sprint/model/entities/sprint.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TeamSpirit, Sprint])],
  providers: [TeamSpiritCrudService],
  controllers: [TeamSpiritCrudController],
  exports: [TeamSpiritCrudService],
})
export class TeamSpiritModule {}
