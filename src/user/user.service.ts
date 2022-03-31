import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {
        
    }

    getuser(){
        return this.userRepository.find();
      }
    
       postuser(userDto : UserDto){
        return this.userRepository.save({
          name: userDto.name,
          email: userDto.email
        })
      }
    

      findUser(player: string) {
        return this.userRepository.findOne({name: player});
      }
    
      // async getuserodds(player : string, game:string){
      // }
    

}
