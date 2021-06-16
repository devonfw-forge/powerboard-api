import { MyCenter } from 'src/app/teams/model/dto/MyCenter';
import { ViewCentersResponse } from '../../../dashboard/ad-center/model/dto/ViewCentersResponse';
import { TeamsInADC } from '../../../teams/model/dto/TeamsInADC';
import { MyProject } from '../../user/model/dto/my_project.interface';

export interface LoginResponse {
  userId: string;
  isPasswordChanged: boolean;
  My_Center: MyCenter | undefined;
  My_Team?: MyProject[];
  Teams_In_ADC: TeamsInADC[];
  ADC_List: ViewCentersResponse[];
  privileges: string[];
}
