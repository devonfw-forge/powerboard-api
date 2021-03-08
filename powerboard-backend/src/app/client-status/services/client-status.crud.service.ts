import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Sprint } from 'src/app/sprint/model/entities/sprint.entity';
import { Repository } from 'typeorm';
import { ClientStatusDTO } from '../model/dto/ClientStatusDTO';
import { ClientStatus } from '../model/entities/client-status.entity';

@Injectable()
export class ClientStatusCrudService extends TypeOrmCrudService<ClientStatus> {
  constructor(
    @InjectRepository(ClientStatus) private readonly clientRepository: Repository<ClientStatus>,
    @InjectRepository(Sprint) private readonly sprintRepository: Repository<Sprint>,
  ) {
    super(clientRepository);
  }
  clientStatusDTO: ClientStatusDTO = new ClientStatusDTO();
  async getClientFeedback(id: number): Promise<ClientStatusDTO> {
    const result = await this.sprintRepository
      .createQueryBuilder('sprint')
      .where('sprint.team_id=:team_id', { team_id: id })
      .orderBy('sprint.sprint_number', 'DESC')
      .skip(1)
      .take(1)
      .getOne();
    const clientStatus = (await this.clientRepository
      .createQueryBuilder('client_status')
      .where('client_status.sprintId=:sprintId', { sprintId: result!.id })
      .limit(1)
      .getOne()) as ClientStatus;
    console.log(clientStatus);

    this.clientStatusDTO.clientSatisfactionRating = clientStatus.client_rating;
    this.clientStatusDTO.sprintNumber = result!.sprint_number;
    return this.clientStatusDTO;
  }
}
