import { ClientStatusDTO } from 'src/app/client-status/model/dto/ClientStatusDTO';
import { CodeQualityDTO } from 'src/app/code-quality-snapshot/model/dto/CodeQualityDTO';
import { TeamSpiritDTO } from 'src/app/team-spirit/model/dto/TeamSpiritDTO';
import { BurndownDTO } from '../../../sprint/model/dto/BurndownDTO';
import { VelocityComaprisonDTO } from '../../../sprint/model/dto/VelocityComparisonDTO';

export class DashBoardDTO {
  teamId!: number;
  teamName!: string;
  codeQualityDTO: CodeQualityDTO = {} as CodeQualityDTO;
  clientStatusDTO: ClientStatusDTO = {} as ClientStatusDTO;
  teamSpiritDTO: TeamSpiritDTO = {} as TeamSpiritDTO;
  burndownDTO: BurndownDTO = {} as BurndownDTO;
  velocityDTO: VelocityComaprisonDTO = {} as VelocityComaprisonDTO;
}
