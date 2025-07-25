import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepositary } from './users.repositary';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JWTPayload } from './dto/jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        // @InjectRepository(UserRepositary)
        private usersRepositary: UserRepositary,
        private jwtService: JwtService // Assuming JwtService is injected

    ){}


    async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
        return this.usersRepositary.createUser(authCredentialDto);


    }


    async signIn(authCredentialDto: AuthCredentialDto): Promise<{accessToken: string}> {
        // Logic for signing in the user will go here
        const { username, password } = authCredentialDto;
        const user = await this.usersRepositary.findOneByUsername(username);

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Here you would typically generate a JWT token and return it
        const payload: JWTPayload = { username: user.username, userId: user.id };
        const accessToken: string = this.jwtService.sign(payload); // jwtService.sign returns a string


        return {accessToken};
    }
}
