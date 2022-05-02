import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import * as crypto from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { AdminDto } from './dto/admin.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  getAllUser() {
    return this.userRepository.find();
  }

  getuser(uuid: string) {
    return this.userRepository.findOne({ uuid: uuid });
  }

  generateRamdomString(size = 64) {
    return crypto.randomBytes(size).toString('base64');
  }

  encryptPassword(password: string, salt: string) {
    return crypto
      .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
      .toString('base64');
  }

  async postuser(userDto: UserDto) {
    const cryptoSalt = this.generateRamdomString();
    const encryptedPassword = this.encryptPassword(
      userDto.password,
      cryptoSalt,
    );

    return await this.userRepository.save({
      name: userDto.name,
      email: userDto.email,
      encryptedPassword: encryptedPassword,
      cryptoSalt: cryptoSalt,
      isAdmin: false,
    });
  }

  findUser(player: string) {
    return this.userRepository.findOne({ name: player });
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({ email: email });
    if (user) {
      if (
        user.encryptedPassword ==
        this.encryptPassword(password, user.cryptoSalt)
      ) {
        const { encryptedPassword, cryptoSalt, ...payload } = user;
        const token = await this.jwtService.signAsync(
          {
            user: payload,
            iat: new Date().getTime(),
          },
          {
            issuer: 'my-boardgame-api',
            expiresIn: 3600000,
          },
        );
        return token;
      }
    }
    throw new BadRequestException(
      '해당하는 이메일이 없거나 패스워드가 잘못되었습니다.',
    );
  }

  async verifyToken(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token);
      if (payload.exp < new Date().getTime()) {
        return null; // new UnauthorizedException('만료 토큰 입니다.');
      }
      return payload.user;
    } catch (e) {
      return null; // new UnauthorizedException('잘못된 토큰 입니다.');
    }
  }

  async postadmin(dto: AdminDto) {
    const existuser = await this.userRepository.findOne({ email: dto.email });
    if (existuser.isAdmin == false) {
      existuser.isAdmin = true;
      return this.userRepository.save(existuser);
    }
    throw new BadRequestException('해당하는 유저는 이미 관리자입니다');
  }

  async verifyAdmini(admin) {
    const existadmin = await this.userRepository.findOne({
      email: admin.email,
    });

    if (existadmin.isAdmin == true) {
      return true;
    }
    return null;
  }
}
