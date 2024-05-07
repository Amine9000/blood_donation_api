import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/services/users.service';
import { compare } from 'bcrypt';
import { ROLE } from 'src/users/enums/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtSerivce: JwtService,
  ) {}
  async login(loginDto: LoginDto) {
    const user = await this.usersService.findOneByEmail(loginDto.email);
    if (user != null) {
      const isMatch = await compare(loginDto.password, user.password);
      if (!isMatch) {
        throw new UnauthorizedException();
      }
      const { id, firstName, lastName, email, phoneNumber, roles, rdvs } = user;
      const payload = {
        sub: id,
        firstName,
        lastName,
        email,
        phoneNumber,
        roles,
      };
      return {
        id,
        firstName,
        lastName,
        email,
        phoneNumber,
        roles,
        rdvs,
        isAdmin: roles.map((role) => role.role).includes(ROLE.ADMIN),
        access_token: await this.jwtSerivce.signAsync(payload),
      };
    } else {
      throw new HttpException(
        'There is no account with this email.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  signup(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
