import { accessRole } from "./access_role.enum";

export interface TeamsMemberResponse{
    userTeamId:string;
    userName:string;
    email:string;
    accessRole:accessRole;
}