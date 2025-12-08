import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInAuth, SignUpAuth } from './dto';
import { Public } from './decorator/public.decorator';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  @Public()
  @Post('signup')
  @ApiOperation({ summary: 'Sign up a new user' })
  @ApiResponse({ status: 201, description: 'User successfully created.' })
  @ApiResponse({ status: 403, description: 'Credentials taken.' })
  signup(@Body() dto: SignUpAuth) {
    return this.authService.signup(dto);
  }

  @Public()
  @Post('signin')
  @ApiOperation({ summary: 'Sign in a user' })
  @ApiResponse({ status: 200, description: 'User successfully signed in.' })
  @ApiResponse({ status: 403, description: 'Invalid credentials.' })
  signin(@Body() dto: SignInAuth) {
    return this.authService.signin(dto);
  }

  @Public()
  @Post('refresh')
  @ApiOperation({ summary: 'Refresh access token using refresh token' })
  @ApiResponse({ status: 200, description: 'New access token generated.' })
  @ApiResponse({ status: 401, description: 'Invalid refresh token.' })
  async refresh(@Body() body: { refresh_token: string }) {
    try {
      const secret = this.config.get('JWT_SECRET');

      // Verify refresh token
      const payload = await this.jwt.verifyAsync(body.refresh_token, {
        secret: secret,
      });

      // Generate new access token with full user data
      const newAccessToken = await this.jwt.signAsync(
        {
          sub: payload.sub,
          email: payload.email,
        },
        {
          expiresIn: '15m',
          secret: secret,
        },
      );

      return {
        access_token: newAccessToken,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
