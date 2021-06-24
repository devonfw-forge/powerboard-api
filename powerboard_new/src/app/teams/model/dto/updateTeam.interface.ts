import { ADCenter } from '../../../dashboard/ad-center/model/entities/ad-center.entity';

export interface UpdateTeam {
  teamId: string;
  teamCode: string;
  projectKey: string;
  ad_center: ADCenter;
}
