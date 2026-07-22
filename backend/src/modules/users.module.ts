import { Body, Controller, Get, Injectable, Module, Param, Patch } from "@nestjs/common";
import { store } from "../store";

@Injectable()
export class UsersService {
  profile(userId: string) {
    return store.users.find((user) => user.id === userId) ?? null;
  }

  updateProfile(userId: string, changes: Record<string, unknown>) {
    const user = store.users.find((entry) => entry.id === userId);
    if (!user) {
      return null;
    }
    Object.assign(user, changes, { updatedAt: new Date().toISOString() });
    return user;
  }

  addresses(userId: string) {
    return store.addresses.filter((address) => address.userId === userId);
  }
}

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("profile/:id")
  profile(@Param("id") idValue: string) {
    return this.usersService.profile(idValue);
  }

  @Patch("profile/:id")
  updateProfile(@Param("id") idValue: string, @Body() body: Record<string, unknown>) {
    return this.usersService.updateProfile(idValue, body);
  }

  @Get("addresses/:id")
  addresses(@Param("id") idValue: string) {
    return this.usersService.addresses(idValue);
  }
}

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
