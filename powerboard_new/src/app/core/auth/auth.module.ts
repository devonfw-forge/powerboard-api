import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@devon4node/config';
import { Config } from '../../shared/model/config/config.model';
import { TeamCrudService } from '../../dashboard/teams/services/team.crud.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from '../../dashboard/teams/model/entities/team.entity';
import { BusinessUnit } from '../../dashboard/business-units/model/entities/business-unit.entity';
import { User } from '../user/model/entities/user.entity';
import { DailyMeeting } from '../../daily-links/model/entities/daily-meeting.entity';
import { ClientStatus } from '../../dashboard/client-status/model/entities/client-status.entity';
import { CodeQualitySnapshot } from '../../dashboard/code-quality-snapshot/model/entities/code-quality-snapshot.entity';
import { Sprint } from '../../dashboard/sprint/model/entities/sprint.entity';
import { TeamSpirit } from '../../dashboard/team-spirit/model/entities/team-spirit.entity';
import { Images } from '../../multimedia/images/model/entities/image.entity';
import { Videos } from '../../multimedia/videos/model/entities/videos.entity';
import { TeamLinks } from '../../team-links/model/entities/team-links.entity';
import { Visibility } from '../../visibility/model/entities/visibility.entity';
import { DailyMeetingCrudService } from '../../daily-links/services/daily-meeting.crud.service';
import { ClientStatusCrudService } from '../../dashboard/client-status/services/client-status.crud.service';
import { CodeQualitySnapshotCrudService } from '../../dashboard/code-quality-snapshot/services/code-quality-snapshot.crud.service';
import { SprintCrudService } from '../../dashboard/sprint/services/sprint.crud.service';
import { TeamSpiritCrudService } from '../../dashboard/team-spirit/services/team-spirit.crud.service';
import { ImagesCrudService } from '../../multimedia/images/services/images.crud.service';
import { VideosCrudService } from '../../multimedia/videos/services/videos.crud.service';
import { TeamLinksCrudService } from '../../team-links/services/team-links.crud.service';
import { VisibilityCrudService } from '../../visibility/services/visibility.crud.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService<Config>) => config.values.jwtConfig,
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([
      Team,
      BusinessUnit,
      User,
      CodeQualitySnapshot,
      ClientStatus,
      TeamSpirit,
      Sprint,
      Images,
      Videos,
      TeamLinks,
      DailyMeeting,
      Visibility,
    ]),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    CodeQualitySnapshotCrudService,
    ClientStatusCrudService,
    TeamSpiritCrudService,
    SprintCrudService,
    TeamLinksCrudService,
    VideosCrudService,
    DailyMeetingCrudService,
    ImagesCrudService,
    VisibilityCrudService,
    TeamCrudService,
  ],
  exports: [AuthService, PassportModule],
  controllers: [AuthController],
})
export class AuthModule {}
