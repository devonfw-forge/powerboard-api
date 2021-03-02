import { BusinessUnit } from "src/app/business-units/model/entities/business-unit.entity";
import { BreadCrumbDTO } from "./BreadCrumbDTO";
import { DashBoardDTO } from "./DashBoardDTO";

export class CompleteResponseDTO {
   user_breadCrumb!:BreadCrumbDTO[]
   dump_businessUnit!:BusinessUnit[]
   dashboard: DashBoardDTO={} as DashBoardDTO;
  
  
}