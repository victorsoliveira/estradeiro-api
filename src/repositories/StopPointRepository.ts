import { Repository, EntityRepository } from "typeorm";
import { Service } from "typedi";
import { StopPoint } from "../entities/StopPoint";

@Service()
@EntityRepository(StopPoint)
export class StopPointRepository extends Repository<StopPoint> {


}
