import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('DRIZZLE') private db: any,
    private jwtService: JwtService,
  ) {}

  async login(username: string, password: string) {
    const adminUser = process.env.ADMIN_USERNAME;
    const adminPass = process.env.ADMIN_PASSWORD;

    if (!adminUser || !adminPass) {
      throw new Error('Admin credentials not configured');
    }

    const valid =
      username === adminUser &&
      (password === adminPass);

    if (!valid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username, isAdmin: true };
    const token = this.jwtService.sign(payload);
    return { access_token: token };
  }
}
