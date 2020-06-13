import { JsonController, Get, Param } from 'routing-controllers';
import { InjectRepository } from "typeorm-typedi-extensions";

import { PlaceRepository } from '../repositories/PlaceRepository';
import { Place } from '../entities/Place';

@JsonController()
export class PlaceController {

  constructor(@InjectRepository() private readonly repository: PlaceRepository) { }

  @Get('/places')
  public async getAll(): Promise<Place[]> {
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
