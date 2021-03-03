import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { ClientStatusDTO } from '../model/dto/ClientStatusDTO';
import { ClientStatus } from '../model/entities/client-status.entity';

@Injectable()
export class ClientStatusCrudService extends TypeOrmCrudService<ClientStatus> {
  constructor(@InjectRepository(ClientStatus) private readonly clientRepository: Repository<ClientStatus>) {
    super(clientRepository);
  }
  clientStatusDTO: ClientStatusDTO = new ClientStatusDTO();
  async getClientFeedback(id:number):Promise<ClientStatusDTO>
  {
    const result = await this.clientRepository.createQueryBuilder("client_status")
                                              .where("client_status.teamId=:teamId" ,{teamId:id})
                                              .orderBy("client_status.sprintNumber","DESC") 
                                               .limit(1).getOne() as ClientStatus;
   this.clientStatusDTO.clientSatisfactionRating = result.clientRating
   this.clientStatusDTO.sprintNumber = result.sprintNumber
   return this.clientStatusDTO;
  }}
