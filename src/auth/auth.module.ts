import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepositary } from './users.repositary';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // ✅ ENTITY only here
  providers: [UserRepositary, AuthService],    // ✅ Include custom repository here
  controllers: [AuthController],
  exports: [UserRepositary],                   // ✅ So it can be used in other modules
})
export class AuthModule {}
