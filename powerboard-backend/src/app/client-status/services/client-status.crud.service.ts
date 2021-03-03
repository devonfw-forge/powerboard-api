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
  async getClientFeedback(id: number): Promise<ClientStatusDTO> {
    const clientStatusResult = await this.clientRepository.find({ where: { teamId: id } });
    this.clientStatusDTO.clientSatisfactionRating = clientStatusResult[0].clientRating;
    this.clientStatusDTO.sprintNumber = clientStatusResult[0].sprintId.sprintNumber;
    return this.clientStatusDTO;
  }
}
