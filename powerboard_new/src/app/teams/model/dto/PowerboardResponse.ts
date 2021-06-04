import { accessRole } from 'src/app/core/auth/model/access_role.enum';
import { DashBoardResponse } from './DashBoardResponse';
import { ElectronBoardResponse } from './ElectronBoardResponse';

export interface PowerboardResponse {
  team_id: string;
  team_name: string;
  center: string;
  logo: string;
  team_code: string;
  accessRole: accessRole;
  dashboard: DashBoardResponse;
  electron_response: ElectronBoardResponse;
}
