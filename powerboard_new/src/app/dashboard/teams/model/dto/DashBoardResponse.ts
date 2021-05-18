import { ClientStatusResponse } from '../../../client-status/model/dto/ClientStatusResponse';
import { CodeQualityResponse } from '../../../code-quality-snapshot/model/dto/CodeQualityResponse';
import { SprintDetailResponse } from '../../../sprint/model/dto/SprintDetailResponse';
import { TeamSpiritResponse } from '../../../team-spirit/model/dto/TeamSpiritResponse';
import { BurndownResponse } from '../../../sprint/model/dto/BurndownResponse';
import { VelocityComparisonResponse } from '../../../sprint/model/dto/VelocityComparisonResponse';

export interface DashBoardResponse {
  teamId: string;
  teamStatus: number|undefined;
  codeQualityResponse: CodeQualityResponse | undefined;
  clientStatusResponse: ClientStatusResponse | undefined;
  teamSpiritResponse: TeamSpiritResponse | undefined;
  burndownResponse: BurndownResponse | undefined;
  sprintDetailResponse: SprintDetailResponse | undefined;
  velocityResponse: VelocityComparisonResponse | undefined;
}
