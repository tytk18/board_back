import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
@ApiTags('멍멍')
export class AppController {
  constructor(private readonly appService: AppService) {}
}
