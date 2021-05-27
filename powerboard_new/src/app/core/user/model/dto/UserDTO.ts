import { Team } from '../../../../teams/model/entities/team.entity';

export interface UserDTO {
  username: string;
  password: string;
  email: string;
  accessRole: number;
  teamId: Team;
}
