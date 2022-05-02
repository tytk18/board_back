import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';

@Injectable()
export class UserGuard implements CanActivate {
  //token을 검증하고 그에 맞는 user를 찾아준다.
  constructor(private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const bearerToken = request.headers.authorization; // Bearer aaa.aaa.aaa
    if (bearerToken == null) throw new ForbiddenException();

    const accessToken = bearerToken.substring(7, bearerToken.length); // aaa.aaa.aaa
    const user: User = await this.userService.verifyToken(accessToken);

    if (user) {
      request.user = user;
      return true;
    }
    return false;
  }
}
