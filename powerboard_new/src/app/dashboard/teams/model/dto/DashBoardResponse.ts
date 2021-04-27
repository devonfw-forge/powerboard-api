import { ClientStatusResponse } from '../../../client-status/model/dto/ClientStatusResponse';
import { CodeQualityResponse } from '../../../code-quality-snapshot/model/dto/CodeQualityResponse';
import { SprintDetailResponse } from '../../../sprint/model/dto/SprintDetailResponse';
import { TeamSpiritResponse } from '../../../team-spirit/model/dto/TeamSpiritResponse';
import { BurndownResponse } from '../../../sprint/model/dto/BurndownResponse';
import { VelocityComparisonResponse } from '../../../sprint/model/dto/VelocityComparisonResponse';

export interface DashBoardResponse {
  teamId: string;
  teamStatus: number;
  codeQualityResponse: CodeQualityResponse;
  clientStatusResponse: ClientStatusResponse;
  teamSpiritResponse: TeamSpiritResponse;
  burndownResponse: BurndownResponse;
  sprintDetailResponse: SprintDetailResponse;
  velocityResponse: VelocityComparisonResponse;
}
