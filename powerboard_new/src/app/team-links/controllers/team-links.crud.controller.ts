import { Body, Controller, Delete, Get, Param, Post, Response } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { CrudType } from '@devon4node/common/serializer';
import { TeamLinksCrudService } from '../services/team-links.crud.service';
import { TeamLinks } from '../model/entities/team-links.entity';
import { TeamLinkDTO } from '../model/dto/TeamLinkDTO';
//import { AuthGuard } from '@nestjs/passport';
import { Response as eResponse } from 'express';

@Crud({
  model: {
    type: TeamLinks,
  },
})
@CrudType(TeamLinks)
@Controller('team-links')
export class TeamLinksCrudController {
  constructor(public teamLinksService: TeamLinksCrudService) {}

  @Get('teamId/:id')
  async getTeamLinks(@Param('id') teamId: string, @Response() res: eResponse): Promise<void> {
    const result = await this.teamLinksService.getTeamLinks(teamId);
    res.status(200).json(result);
  }

  @Delete('delete/:id')
  async deleteTeamLinkById(@Param('id') teamLinkId: string, @Response() res: eResponse): Promise<void> {
    const result = await this.teamLinksService.deleteTeamLinkById(teamLinkId);
    console.log(result);
    res.status(200).json({ message: 'TeamLink successfully Deleted' });
  }

  @Post('teamId/create')
  // @UseGuards(AuthGuard('jwt'))
  async addTeamLinks(@Body() teamLinkDTO: TeamLinkDTO, @Response() res: eResponse): Promise<void> {
    const result = await this.teamLinksService.createTeamLinks(teamLinkDTO);
    res.status(201).json(result);
  }
}
