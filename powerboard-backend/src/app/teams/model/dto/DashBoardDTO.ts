import { ClientStatusDTO } from "src/app/client-status/model/dto/ClientStatusDTO";
import { CodeQualityDTO } from "src/app/code-quality-snapshot/model/dto/CodeQualityDTO";
import { TeamSpiritDTO } from "src/app/team-spirit/model/dto/TeamSpiritDTO";
import { CompleteResponseDTO } from "./CompleteResponseDTO";


export class DashBoardDTO  extends CompleteResponseDTO{

     codeQualityDTO: CodeQualityDTO ={} as CodeQualityDTO;
     clientStatusDTO:ClientStatusDTO ={} as ClientStatusDTO;
     teamSpiritDTO:TeamSpiritDTO = {} as TeamSpiritDTO;
}