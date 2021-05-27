import { accessRole } from "../../core/auth/model/access_role.enum";
export interface UpdateRole{
    userTeamId:string;
    accessRole: accessRole;
}