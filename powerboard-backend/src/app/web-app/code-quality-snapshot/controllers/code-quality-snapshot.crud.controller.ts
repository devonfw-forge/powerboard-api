import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { CrudType } from '@devon4node/common/serializer';
import { CodeQualitySnapshot } from '../model/entities/code-quality-snapshot.entity';
import { CodeQualitySnapshotCrudService } from '../services/code-quality-snapshot.crud.service';


@Crud({
  model: {
    type: CodeQualitySnapshot,
  },
})
@CrudType(CodeQualitySnapshot)
@Controller('code-quality-snapshot/codes')
export class CodeQualitySnapshotCrudController {
  constructor(public service: CodeQualitySnapshotCrudService) {}
}
