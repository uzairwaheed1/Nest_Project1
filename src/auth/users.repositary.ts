import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthCredentialDto } from "./dto/auth-credential.dto";



Injectable()
export class UserRepositary{
    constructor(
        @InjectRepository(User)
        private readonly repo: Repository<User>
    ){}


    async createUser(authCredentialDto: AuthCredentialDto): Promise<void>{
        
        const {username, password} = authCredentialDto;

        const user = this.repo.create({username, password});
        try{
            await this.repo.save(user);

        }catch(error){
            if(error.code === '23505'){
                throw new ConflictException('Username Already Exist')
            }else{
                throw new InternalServerErrorException();
            }
        }


    }
}