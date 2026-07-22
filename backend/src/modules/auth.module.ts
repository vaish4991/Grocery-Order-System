import { Body, Controller, Get, Injectable, Module, Post } from "@nestjs/common";
import { id, store } from "../store";

interface RegisterDto {
  name: string;
  email: string;
  phone: string;
  password: string;
}

interface LoginDto {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  register(input: RegisterDto) {
    const user = {
      id: id("user"),
      name: input.name,
      email: input.email,
      phone: input.phone,
      password: input.password,
      role: "CUSTOMER" as const,
      status: "pending" as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    store.users.push(user);

    return {
      message: "Registration started",
      user,
      next: "Verify OTP"
    };
  }

  login(input: LoginDto) {
    const user = store.users.find((entry) => entry.email === input.email);

    return {
      accessToken: `access-${user?.id ?? "guest"}`,
      refreshToken: `refresh-${user?.id ?? "guest"}`,
      user: user ?? null,
      success: Boolean(user)
    };
  }

  verifyOtp(email: string) {
    const user = store.users.find((entry) => entry.email === email);
    if (user) {
      user.status = "active";
      user.updatedAt = new Date().toISOString();
    }
    return { verified: Boolean(user), email };
  }

  forgotPassword(email: string) {
    return { sent: Boolean(store.users.find((entry) => entry.email === email)), email };
  }

  resetPassword(email: string) {
    return { reset: Boolean(store.users.find((entry) => entry.email === email)), email };
  }

  refreshToken() {
    return { accessToken: `access-${Date.now()}` };
  }
}

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @Post("login")
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Post("verify-otp")
  verifyOtp(@Body() body: { email: string }) {
    return this.authService.verifyOtp(body.email);
  }

  @Post("forgot-password")
  forgotPassword(@Body() body: { email: string }) {
    return this.authService.forgotPassword(body.email);
  }

  @Post("reset-password")
  resetPassword(@Body() body: { email: string }) {
    return this.authService.resetPassword(body.email);
  }

  @Get("refresh")
  refresh() {
    return this.authService.refreshToken();
  }
}

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
