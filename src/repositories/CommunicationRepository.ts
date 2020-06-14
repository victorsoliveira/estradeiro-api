import { Repository, EntityRepository } from "typeorm";
import { Service } from "typedi";
import { Communication } from "../entities/Communication";

@Service()
@EntityRepository(Communication)
export class CommunicationRepository extends Repository<Communication> {


}
