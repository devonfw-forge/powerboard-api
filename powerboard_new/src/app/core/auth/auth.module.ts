import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@devon4node/config';
import { Config } from '../../shared/model/config/config.model';
import { TeamsModule } from '../../teams/teams.module';
import { ADCenterModule } from '../../dashboard/ad-center/ad-center.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService<Config>) => config.values.jwtConfig,
      inject: [ConfigService],
    }),
    // TypeOrmModule.forFeature([ UserTeam]),
    TeamsModule,
    ADCenterModule,
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, PassportModule],
  controllers: [AuthController],
})
export class AuthModule {}
