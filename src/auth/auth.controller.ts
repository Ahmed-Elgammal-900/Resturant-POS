import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { AuthGuard } from '../auth/auth.gurad';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('SignIn')
  async handleAuth(
    @Body() body: { email: string; password: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    const { email, password } = body;
    const { token, user } = await this.authService.validateUser(
      email,
      password,
    );
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 3600000,
      sameSite: 'none',
      secure: process.env.ENVIROMENT === 'production',
      priority: 'high',
    });
    res.json({ isAuth: true, user: user });
  }

  @Post('SignUp')
  async SignUp(
    @Body() body: { email: string; password: string; user: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    const { email, password, user } = body;
    const result = await this.authService.registerUser(email, password, user);
    res.cookie('token', result, {
      httpOnly: true,
      maxAge: 3600000,
      sameSite: 'none',
      secure: process.env.ENVIROMENT === 'production',
      priority: 'high',
    });
    res.json({ user: user, isAuth: true });
  }

  @Post('Logout')
  logOut(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token', {
      httpOnly: true,
      sameSite: 'none',
      secure: process.env.ENVIROMENT === 'production',
    });
  }

  @Get('status')
  @UseGuards(AuthGuard)
  checkStatus(@Req() req: Request, @Res() res: Response) {
    res.json(req['user']);
  }

  @Delete()
  @UseGuards(AuthGuard)
  deleteUser(@Req() req: Request, @Res() res: Response) {
    const response = this.authService.deleteAccount(req['user']);
    res.clearCookie('token', {
      httpOnly: true,
      sameSite: 'none',
      secure: process.env.ENVIROMENT === 'production',
    });
    res.json(response)
  }
}
