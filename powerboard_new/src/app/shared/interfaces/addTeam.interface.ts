import { ADCenter } from '../../dashboard/ad-center/model/entities/ad-center.entity';

export interface AddTeam {
  teamName: string;
  teamCode: string;
  projectKey: string;
  logo?: string;
  ad_center: ADCenter;
  member_number?: number;
  frequency?: number;
  start_date?: string;
}
