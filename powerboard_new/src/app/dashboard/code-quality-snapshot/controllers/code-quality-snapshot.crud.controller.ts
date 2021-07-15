import { Controller, Inject } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { CrudType } from '@devon4node/common/serializer';
import { CodeQualitySnapshot } from '../model/entities/code-quality-snapshot.entity';
import { ICodeQualityService } from '../services/code-quality-interface';

@Crud({
  model: {
    type: CodeQualitySnapshot,
  },
})
@CrudType(CodeQualitySnapshot)
@Controller('code-quality-snapshot/codes')
export class CodeQualitySnapshotCrudController {
  constructor(@Inject('ICodeQualityService') public service: ICodeQualityService) {
    // console.log(this.service);
  }
}
