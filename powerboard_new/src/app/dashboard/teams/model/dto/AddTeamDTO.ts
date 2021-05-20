import { BusinessUnit } from "src/app/dashboard/business-units/model/entities/business-unit.entity";


export interface AddTeamDTO{
    name:string;
    teamCode:string;
    logo:string;
    business_unit:BusinessUnit;

}