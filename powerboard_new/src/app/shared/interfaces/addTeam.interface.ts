import { BusinessUnit } from "src/app/dashboard/business-units/model/entities/business-unit.entity";

export interface AddTeam{
    name:string;
    teamCode:string;
    logo:string;
    business_unit:BusinessUnit;
}