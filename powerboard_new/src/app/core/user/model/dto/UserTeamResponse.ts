import { accessRole } from '../../../auth/model/access_role.enum';

export interface UserTeamResponse {
  teamId: string;
  teamName: string;
  accessRole: accessRole;
}
