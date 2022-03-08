import { EntityRepository, Repository } from "typeorm";
import { User } from "../entities/User";


//obs: extends serve para estender os métodos de outra classe
// o implement serve para implementar importando da interface
@EntityRepository(User)
class UsersRepositories extends Repository<User>{

}

export { UsersRepositories }