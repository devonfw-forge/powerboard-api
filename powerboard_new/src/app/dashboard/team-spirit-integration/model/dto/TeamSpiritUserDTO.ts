import { TeamSpiritRolesDTO } from './TeamSpiritRolesDTO';
import { TeamDTO } from './TeamDTO';

export class TeamSpiritUserDTO {
  RoleID?: number;
  Email?: string;
  Full_Name?: string;
  Id?: number;
  Password?: string;
  Role?: TeamSpiritRolesDTO;
  Teams?: TeamDTO[];
}
