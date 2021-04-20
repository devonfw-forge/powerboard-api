import { Team } from '../../../dashboard/teams/model/entities/team.entity';

export interface TeamLinkDTO {
  title: string;
  links: string;
  teamId: Team;
}
