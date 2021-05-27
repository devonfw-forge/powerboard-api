import { ClientStatusResponse } from '../../../dashboard/client-status/model/dto/ClientStatusResponse';
import { CodeQualityResponse } from '../../../dashboard/code-quality-snapshot/model/dto/CodeQualityResponse';
import { SprintDetailResponse } from '../../../dashboard/sprint/model/dto/SprintDetailResponse';
import { TeamSpiritResponse } from '../../../dashboard/team-spirit-integration/model/dto/TeamSpiritResponse';
import { BurndownResponse } from '../../../dashboard/sprint/model/dto/BurndownResponse';
import { VelocityComparisonResponse } from '../../../dashboard/sprint/model/dto/VelocityComparisonResponse';

export interface DashBoardResponse {
  teamId: string;
  teamStatus: number | undefined;
  codeQualityResponse: CodeQualityResponse | undefined;
  clientStatusResponse: ClientStatusResponse | undefined;
  teamSpiritResponse: TeamSpiritResponse | undefined;
  burndownResponse: BurndownResponse | undefined;
  sprintDetailResponse: SprintDetailResponse | undefined;
  velocityResponse: VelocityComparisonResponse | undefined;
}
