import { accessRole } from "src/app/core/auth/model/access_role.enum";

export interface TeamsMemberResponse{
    userTeamId:string;
    userName:string;
    email:string;
    accessRole:accessRole;
}