import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthCredentialDto } from "./dto/auth-credential.dto";
import * as bcrypt from 'bcrypt';



Injectable()
export class UserRepositary {
    constructor(
        @InjectRepository(User)
        private readonly repo: Repository<User>
    ) { }


    async createUser(authCredentialDto: AuthCredentialDto): Promise<void> {

        const { username, password } = authCredentialDto;

        
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = this.repo.create({ username, password: hashedPassword });

        try {
            await this.repo.save(user);
            console.log('User Created Successfully', username);
            console.log('User Details:', user);

        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Username Already Exist')
            } else {
                throw new InternalServerErrorException();
            }
        }


    }
}