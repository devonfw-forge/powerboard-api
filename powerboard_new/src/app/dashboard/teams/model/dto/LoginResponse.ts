import { BusinessUnit } from '../../../business-units/model/entities/business-unit.entity';
import { BreadCrumbResponse } from './BreadCrumbResponse';
import { DashBoardResponse } from './DashBoardResponse';
import { ElectronBoardResponse } from './ElectronBoardResponse';

export interface LoginResponse {
  team_id: string;
  center: string;
  logo: string;
  dashboard: DashBoardResponse;
  user_breadCrumb: BreadCrumbResponse[];
  dump_businessUnit: BusinessUnit[];
  electron_response: ElectronBoardResponse;
}
