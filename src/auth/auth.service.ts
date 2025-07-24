import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepositary } from './users.repositary';
import { AuthCredentialDto } from './dto/auth-credential.dto';

@Injectable()
export class AuthService {
    constructor(
        // @InjectRepository(UserRepositary)
        private usersRepositary: UserRepositary

    ){}


    async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
        return this.usersRepositary.createUser(authCredentialDto);
    }
}
