import { MyCenter } from 'src/app/teams/model/dto/MyCenter';
import { ViewCentersResponse } from '../../../dashboard/ad-center/model/dto/ViewCentersResponse';
import { TeamsInADC } from '../../../teams/model/dto/TeamsInADC';
import { MyProject } from '../../user/model/dto/my_project.interface';
import { roles } from './roles.enum';

export interface LoginResponse {
  userId: string;
  role:roles;
  isPasswordChanged:boolean;
  My_Center:MyCenter|undefined;
  My_Team?: MyProject[] | undefined;
  Teams_In_ADC: TeamsInADC[] | undefined;
  ADC_List: ViewCentersResponse[] | undefined;
}
