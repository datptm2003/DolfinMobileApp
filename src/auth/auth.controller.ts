import { Body, Controller, Post, HttpCode, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from '../schemas/user.schema';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register an Account' })
  register(@Body() registerUserDto:RegisterUserDto):Promise<User> {
      console.log('register api');
      console.log(registerUserDto);
      return this.authService.register(registerUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login an Account' })
  @ApiResponse({status:201, description:'Login successfully!'})
  @ApiResponse({status:401, description:'Login fail!'})
  @UsePipes(ValidationPipe)
  login(@Body() loginUserDto: LoginUserDto):Promise<any> {
    console.log('login api');
    console.log(loginUserDto);
    return this.authService.login(loginUserDto);
  }

  @Post('refresh-token')
  @ApiOperation({ summary: 'Get Refresh Token' })
  refreshToken(@Body() {refresh_token}):Promise<any>{
      console.log('refresh token api')
      return this.authService.refreshToken(refresh_token);
  }
}