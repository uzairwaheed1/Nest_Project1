import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ){}

    @Post('/signup')
    async signup(@Body() authCredentialDto: AuthCredentialDto): Promise<void>{
        return this.authService.signUp(authCredentialDto)
    }

    @Post('/signin')
    async signin(@Body() authCredentialDto: AuthCredentialDto): Promise<{accessToken: string}> {
        return this.authService.signIn(authCredentialDto);
    }

    @Post('/protected')
    @UseGuards(AuthGuard())
    test(@Req() req): string {
        return `This is a protected route. Welcome ${req.user.username}`;
    }
}
