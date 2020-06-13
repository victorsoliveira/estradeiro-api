import { JsonController, Get, Param, HttpCode, Res } from 'routing-controllers';
import { InjectRepository } from "typeorm-typedi-extensions";

import { StopPointRepository } from '../repositories/StopPointRepository';
import { StopPoint } from '../entities/StopPoint';

@JsonController()
export class StopPointController {

  constructor(@InjectRepository() private readonly repository: StopPointRepository) { }

  @Get('/stoppoints')
  public async getAll(): Promise<StopPoint[]> {
    return await this.repository.find();
  }

  @Get('/stoppoints/:id')
  public async getById(@Param('id') id: number): Promise<StopPoint|null> {
    const result = await this.repository.findByIds([id]);
    if (result && result.length > 0) {
      return result[0];
    }
    return null;
  }
}
