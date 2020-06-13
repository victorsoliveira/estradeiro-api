import { JsonController, Get, Param, QueryParam } from 'routing-controllers';
import { InjectRepository } from "typeorm-typedi-extensions";

import { PlaceRepository } from '../repositories/PlaceRepository';
import { Place } from '../entities/Place';
import { Like } from 'typeorm';

@JsonController()
export class PlaceController {

  constructor(@InjectRepository() private readonly repository: PlaceRepository) { }

  @Get('/places')
  public async getAll(@QueryParam('qs') qs: string): Promise<Place[]> {

    const args = {
      where: [
        {
          'category': Like(`%${qs}%`),
        }
      ]
    };

    if (qs) {
      return await this.repository.find(args);
    }

    return await this.repository.find();
  }

  @Get('/places/:id')
  public async getById(@Param('id') id: number): Promise<Place|null> {
    const result = await this.repository.findByIds([id]);
    if (result && result.length > 0) {
      return result[0];
    }
    return null;
  }

}
