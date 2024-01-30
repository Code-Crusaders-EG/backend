import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { UserReferenceDTO } from '@backend/dtos/room';
import { ResourceDto } from '@backend/dtos/resource';
import { UserDto } from '@backend/dtos/user';

import { RoomService } from '../services/room.service';

@Resolver(() => UserReferenceDTO)
export class UserReferenceResolver {
  constructor(private readonly roomService: RoomService) {}

  @ResolveField(() => [ResourceDto])
  async resources(@Parent() user: UserDto) {
    return await this.roomService.findAllByAuthorId(user.id);
  }
}
