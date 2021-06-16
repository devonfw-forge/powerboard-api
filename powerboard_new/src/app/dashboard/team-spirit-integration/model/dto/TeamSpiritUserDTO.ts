import { TeamSpiritRolesDTO } from './TeamSpiritRolesDTO';
import { TeamDTO } from './TeamDTO';

export class TeamSpiritUserDTO {
  roleID?: number;
  Email?: string;
  full_name?: string;
  id?: number;
  Password?: string;
  role?: TeamSpiritRolesDTO;
  teams?: TeamDTO[];
}
