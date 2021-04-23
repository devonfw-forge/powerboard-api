import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamLinksCrudController } from './controllers/team-links.crud.controller';
import { TeamLinks } from './model/entities/team-links.entity';
import { TeamLinksCrudService } from './services/team-links.crud.service';

@Module({
  imports: [TypeOrmModule.forFeature([TeamLinks])],
  providers: [TeamLinksCrudService],
  controllers: [TeamLinksCrudController],
  exports: [TeamLinksCrudService],
})
export class TeamLinksModule {}
