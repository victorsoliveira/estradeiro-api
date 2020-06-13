import { Repository, EntityRepository } from "typeorm";
import { User } from "../entities/User";
import { Service } from "typedi";

@Service()
@EntityRepository(User)
export class UserRepository extends Repository<User> {


}
