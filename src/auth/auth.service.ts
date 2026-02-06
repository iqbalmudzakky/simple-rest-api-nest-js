import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { comparePassword } from 'src/common/utils/bcrypt/bcrypt.utils';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const match = comparePassword(dto.password, user.password);
    if (!match) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };
    try {
      const token = await this.jwtService.signAsync(payload);
      return { access_token: token };
    } catch (err) {
      console.log('🚀 ~ AuthService ~ login ~ err:', err);
    }
  }
}
