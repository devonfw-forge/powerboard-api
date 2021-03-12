import { ClientStatusResponse } from 'src/app/client-status/model/dto/ClientStatusResponse';
import { CodeQualityResponse } from 'src/app/code-quality-snapshot/model/dto/CodeQualityResponse';
import { SprintDetailResponse } from 'src/app/sprint/model/dto/SprintDetailResponse';
import { TeamSpiritResponse } from 'src/app/team-spirit/model/dto/TeamSpiritResponse';
import { BurndownResponse } from '../../../sprint/model/dto/BurndownResponse';
import { VelocityComparisonResponse } from '../../../sprint/model/dto/VelocityComparisonResponse';

export interface DashBoardResponse {
  teamId: number;
  teamStatus:number;
  codeQualityResponse: CodeQualityResponse;
  clientStatusResponse: ClientStatusResponse 
  teamSpiritResponse:TeamSpiritResponse;
  burndownResponse: BurndownResponse
  sprintDetailResponse:SprintDetailResponse
  velocityResponse: VelocityComparisonResponse;
}
