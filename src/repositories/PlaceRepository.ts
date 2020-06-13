import { Repository, EntityRepository } from "typeorm";
import { Service } from "typedi";
import { Place } from "../entities/Place";

@Service()
@EntityRepository(Place)
export class PlaceRepository extends Repository<Place> {


}
