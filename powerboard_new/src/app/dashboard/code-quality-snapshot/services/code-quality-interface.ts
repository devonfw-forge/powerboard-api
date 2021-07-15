import { CodeQualityResponse } from '../model/dto/CodeQualityResponse';

export interface ICodeQualityService {
  getCodeQualitySnapshot(teamId: string): Promise<CodeQualityResponse | undefined>;
}
