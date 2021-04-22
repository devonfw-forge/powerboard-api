import { Team } from '../../../dashboard/teams/model/entities/team.entity';

export interface DailyMeetingDTO {
  type: string;
  links: string;
  teamId: Team;
}
