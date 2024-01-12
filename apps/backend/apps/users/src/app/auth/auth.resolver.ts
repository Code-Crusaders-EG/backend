import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserDto } from '../users/dto/user.dto';
import { UsersService } from '../users/users.service';
import { LoginResponse, LoginUserDto, userTokenPayload } from './dto/login.dto';
import { AuthService } from './auth.service';
import { RegisterResponse, RegisterUserDto } from './dto/register.dto';

@Resolver(() => UserDto)
export class AuthResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Mutation(() => LoginResponse, {
    description:
      'Login a user with username or email and password, returns JWT token.',
  })
  async login(@Args('credentials') credentials: LoginUserDto) {
    const user = await this.authService.login(credentials);
    const userPayload = new userTokenPayload(user);
    const token = await this.authService.generateToken(userPayload);
    return new LoginResponse(token, user);
  }

  @Mutation(() => RegisterResponse)
  async register(@Args('userInfo') userInfo: RegisterUserDto) {
    const user = await this.authService.register(userInfo);
    const userPayload = new userTokenPayload(user);
    const token = await this.authService.generateToken(userPayload);
    return new RegisterResponse(token, user);
  }

  @Query(() => UserDto)
  async me(@Args('token') token: string) {
    const user = await this.authService.parseUserFromToken(token);
    return this.usersService.findById(user.id);
  }
}