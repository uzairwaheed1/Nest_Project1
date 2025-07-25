import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWTPayload } from './dto/jwt-payload.interface';
import { In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepositary } from './users.repositary';
import { User } from './user.entity';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private usersRepositary: UserRepositary
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'yourSecretKey', // Use env variable in production!
    });
  }

  async validate(payload: JWTPayload) {

    const { username, userId } = payload;
    // Here you can add additional validation logic if needed   

    const user: User = await this.usersRepositary.findOneByUsername(username);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }       
    
    return user; // Return the user object to be available in the request object
  }
}