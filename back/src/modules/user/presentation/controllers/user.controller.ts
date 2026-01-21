import { Controller, Get, Param, Query, Patch, Body } from '@nestjs/common';
import { GetUserByIdUseCase } from '../../application/get-user-by-id.use-case';
import { SearchUserUseCase } from '../../application/search-user.use-case';
import { UpdateUserNameUseCase } from '../../application/update-user-name.use-case';
import { UserResponseDto } from '../dto/user-response.dto';
import { UpdateUserNameDto } from '../dto/update-user-name.dto';

@Controller('users')
export class UserController {
  constructor() // private readonly getUserByIdUseCase: GetUserByIdUseCase,
  // private readonly searchUserUseCase: SearchUserUseCase,
  {}

  // @Get(':id')
  // async getById(@Param('id') id: string): Promise<UserResponseDto> {
  //   const user = await this.getUserByIdUseCase.execute(id);

  //   return UserResponseDto.from(user);
  // }

  // @Get()
  // async search(@Query('keyword') keyword: string): Promise<UserResponseDto[]> {
  //   const users = await this.searchUserUseCase.execute(keyword ?? '');
  //   return users.map(UserResponseDto.from);
  // }
}
