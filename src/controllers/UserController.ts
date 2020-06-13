import { JsonController, Get, Post, Body, HttpCode } from 'routing-controllers';
import { InjectRepository } from "typeorm-typedi-extensions";

import { UserRepository } from '../repositories/UserRepository';

import { User } from '../entities/User';

@JsonController()
export class UserController {

  constructor(@InjectRepository() private readonly repository: UserRepository) { }

  @Get('/users')
  public async getAll(): Promise<User[]> {
    return await this.repository.find();
  }

  @HttpCode(201)
  @Post('/users')
  public async create(@Body() user: User): Promise<User> {
    return await this.repository.save(user);
  }

}
