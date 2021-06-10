import { ClientStatusResponse } from '../../../dashboard/client-status/model/dto/ClientStatusResponse';
import { CodeQualityResponse } from '../../../dashboard/code-quality-snapshot/model/dto/CodeQualityResponse';
import { SprintDetailResponse } from '../../../dashboard/sprint/model/dto/SprintDetailResponse';
import { TeamSpiritResponse } from '../../../dashboard/team-spirit-integration/model/dto/TeamSpiritResponse';
import { BurndownResponse } from '../../../dashboard/sprint/model/dto/BurndownResponse';
import { VelocityComparisonResponse } from '../../../dashboard/sprint/model/dto/VelocityComparisonResponse';

export interface DashBoardResponse {
  teamId: string;
  teamStatus: number | undefined;
  codeQuality: CodeQualityResponse | undefined;
  clientStatus: ClientStatusResponse | undefined;
  teamSpirit: TeamSpiritResponse | undefined;
  burndown: BurndownResponse | undefined;
  sprintDetail: SprintDetailResponse | undefined;
  velocity: VelocityComparisonResponse | undefined;
}
