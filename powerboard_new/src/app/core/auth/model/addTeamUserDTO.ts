import { Team } from "src/app/dashboard/teams/model/entities/team.entity";

export interface AddTeamUserDTO {
    username: string;
    teamId: Team[];
  }