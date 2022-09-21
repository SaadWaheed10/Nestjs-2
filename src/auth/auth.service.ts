import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService 
{

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    ){}

  async validateUser(email: string, password: string)
  {
    const user = await this.userService.findByEmail(email);

    if(user && user.password == password) 
    {
      return user;
    }

    return null;
  }

  async login(user: any) 
  {
    const payload = { email: user.email, sub: user.id };
    return 
    {
      access_token: this.jwtService.sign(payload);
    }
  } 

}
