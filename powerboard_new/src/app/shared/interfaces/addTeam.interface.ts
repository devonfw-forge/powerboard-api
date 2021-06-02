import { ADCenter } from '../../dashboard/ad-center/model/entities/ad-center.entity';

export interface AddTeam {
  name: string;
  teamCode: string;
  projectKey:string;
  logo?: string;
  ad_center: ADCenter;
}
