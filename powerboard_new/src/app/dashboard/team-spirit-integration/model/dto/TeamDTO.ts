import { SurveyDTO } from './SurveyDTO';
import { TeamSpiritUserDTO } from './TeamSpiritUserDTO';

export class TeamDTO {
  frequencey?: number;
  name!: string;
  num_mumbers?: number;
  startDate?: string;
  surveys?: SurveyDTO;
  users?: TeamSpiritUserDTO[];
}

// "frequency": 0,
// "name": "string",
// "num_mumbers": 0,
// "startDate": "string",
// "surveys": [
//   {
//     "TeamName": "string",
//     "code": "string",
//     "endDate": "string",
//     "median": 0,
//     "notes": [
//       {
//         "Number": 0,
//         "SurveyCode": "string",
//         "User": "string",
//         "note": 0
//       }
//     ],
//     "startDate": "string"
//   }
// ],
// "users": [
//   {
//     "RoleID": 0,
//     "email": "string",
//     "full_name": "string",
//     "id": 0,
//     "password": "string",
//     "role": {
//       "id": 0,
//       "name": "string"
//     },
//     "teams": [
//       null
//     ]
//   }
// ]
