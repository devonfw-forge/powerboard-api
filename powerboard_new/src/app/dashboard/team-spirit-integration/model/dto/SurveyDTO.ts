import { NotesDTO } from './NotesDTO';

export class SurveyDTO {
  TeamName!: string;
  code!: string;
  endDate!: string;
  median?: number;
  note?: NotesDTO[];
  startDate?: string;
}

//"surveys": [
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
