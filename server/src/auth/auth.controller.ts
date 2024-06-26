import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInAuth, SignUpAuth } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  signup(@Body() dto: SignUpAuth) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  signin(@Body() dto: SignInAuth) {
    console.log({ dto: dto });
    return this.authService.signin(dto);
  }
}
