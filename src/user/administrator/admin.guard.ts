import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { User } from '../user.entity';
import { UserService } from '../user.service';
@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const bearerToken = request.headers.authorization; // Bearer aaa.aaa.aaa
    if (bearerToken == null) throw new ForbiddenException();

    const accessToken = bearerToken.substring(7, bearerToken.length); // aaa.aaa.aaa
    const admin: User = await this.userService.verifyToken(accessToken);

    if (await this.userService.verifyAdmini(admin)) {
      request.user = admin;
      return true;
    }
    return false;
  }
}
