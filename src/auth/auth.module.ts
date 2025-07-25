import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepositary } from './users.repositary';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: 'yourSecretKey', // Use env variable in production!
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forFeature([User]),
], // ✅ ENTITY only here
  providers: [UserRepositary, AuthService, JwtStrategy],    // ✅ Include custom repository here
  controllers: [AuthController],
  exports: [UserRepositary, JwtStrategy, PassportModule],                   // ✅ So it can be used in other modules
})
export class AuthModule {}
