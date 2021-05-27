export class TeamSpiritDTO
{
     // Mandatory
  projectName!: string;
  // For results V
  surveyMedian?: number;
  lastDate?: Date;
  completeness?: string;

  // For configuration V
  members?: number;

  sprintLength?: number;

  startDate?: Date;

  // To store resonse from mendix call
  mendixResponse?: string;

}