import { JsonController, Get, Post, Body, HttpCode, Req, Res } from 'routing-controllers';
import { InjectRepository } from "typeorm-typedi-extensions";

import { CommunicationRepository } from '../repositories/CommunicationRepository';
import { Communication } from '../entities/Communication';
import { Response, Request } from 'express';

type FileInfo = { fileName: string, fileType: string };

@JsonController('/communication')
export class CommunicationController {

  constructor(@InjectRepository() private readonly communicationRepo: CommunicationRepository) { }

  @Post('/df')
  public async df(@Req() req: Request, @Res() res: Response): Promise<Response> {

    const result = req.body.queryResult;
    const context = (<Array<any>>result.outputContexts).find((context) => (<string>context.name).endsWith('contact'));
    const identifier = (<string>req.body.session).split('/')[4];

    if (result.action === 'sendmessage') {
      await this.communicationRepo.insert(new Communication(context.parameters.contact, context.parameters.message, identifier));
    };

    return res.status(200);
  }

  @Get()
  public async getAll(@Req() req: Request, @Res() res: Response): Promise<Communication[]> {
    return await this.communicationRepo.find();
  }

}
