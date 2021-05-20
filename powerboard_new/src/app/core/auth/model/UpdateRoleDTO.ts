import { accessRole } from "./access_role.enum";

export interface updateRoleDTO{
    userTeamId:string;
    accessRole: accessRole;
}