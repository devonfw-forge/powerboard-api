import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { ClientStatusDTO } from '../model/dto/ClientStatusDTO';
import { ClientStatus } from '../model/entities/client-status.entity';

@Injectable()
export class ClientStatusCrudService extends TypeOrmCrudService<ClientStatus> {
  constructor(@InjectRepository(ClientStatus)private readonly clientRepository: Repository<ClientStatus>) {
    super(clientRepository);
  }
  clientDTO: ClientStatusDTO = new ClientStatusDTO();
  async getClientFeedback(id:number):Promise<ClientStatusDTO>
  {
    const result = await this.clientRepository.find({where :{teamId:id}}) 
     this.clientDTO.clientSatisfactionRating= result[0].clientRating;
     this.clientDTO.sprintNumber = result[0].sprintId.sprintNumber;
     return this.clientDTO;
  }
}
