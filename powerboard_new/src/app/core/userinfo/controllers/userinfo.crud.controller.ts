import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { CrudType } from '@devon4node/common/serializer';
import { UserInfo } from '../model/entities/userinfo.entity';
import { UserInfoCrudService } from '../services/userinfo.crud.service';

@Crud({
  model: {
    type: UserInfo,
  },
})
@CrudType(UserInfo)
@Controller('user-info')
export class UserInfoCrudController {
  constructor(public userInfoService: UserInfoCrudService) {}
}
