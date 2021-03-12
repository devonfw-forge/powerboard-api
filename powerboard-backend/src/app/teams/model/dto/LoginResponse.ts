
import { BusinessUnit } from "src/app/business-units/model/entities/business-unit.entity";
import { BreadCrumbResponse } from "./BreadCrumbResponse";
import { DashBoardResponse } from "./DashBoardResponse";

export interface LoginResponse {
   dashboard: DashBoardResponse;
   user_breadCrumb:BreadCrumbResponse[]
   dump_businessUnit:BusinessUnit[]
   
  
  
}