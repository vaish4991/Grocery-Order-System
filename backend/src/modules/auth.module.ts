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

function generateOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

@Injectable()
export class AuthService {
  register(input: RegisterDto) {
    const code = generateOtp();
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
    store.otps.push({
      email: input.email,
      code,
      expiresAt: new Date(Date.now() + 1000 * 60 * 10).toISOString()
    });

    return {
      message: "Registration started",
      user,
      otp: code,
      next: "Verify OTP"
    };
  }

  login(input: LoginDto) {
    const user = store.users.find((entry) => entry.email === input.email && entry.password === input.password);

    return {
      accessToken: `access-${user?.id ?? "guest"}`,
      refreshToken: `refresh-${user?.id ?? "guest"}`,
      user: user ?? null,
      success: Boolean(user)
    };
  }

  verifyOtp(email: string, code: string) {
    const otp = store.otps.find((entry) => entry.email === email && entry.code === code);
    const user = store.users.find((entry) => entry.email === email);
    if (!otp || !user || new Date(otp.expiresAt).getTime() < Date.now()) {
      return { verified: false, email };
    }
    if (user) {
      user.status = "active";
      user.updatedAt = new Date().toISOString();
    }
    store.otps = store.otps.filter((entry) => !(entry.email === email && entry.code === code));
    return { verified: Boolean(user), email };
  }

  resendOtp(email: string) {
    const code = generateOtp();
    store.otps = store.otps.filter((entry) => entry.email !== email);
    store.otps.push({
      email,
      code,
      expiresAt: new Date(Date.now() + 1000 * 60 * 10).toISOString()
    });
    return { email, code, sent: true };
  }

  forgotPassword(email: string) {
    const user = store.users.find((entry) => entry.email === email);
    if (!user) {
      return { sent: false, email };
    }
    const code = generateOtp();
    store.otps = store.otps.filter((entry) => entry.email !== email);
    store.otps.push({
      email,
      code,
      expiresAt: new Date(Date.now() + 1000 * 60 * 10).toISOString()
    });
    return { sent: true, email, code };
  }

  resetPassword(email: string, code: string, newPassword: string) {
    const otp = store.otps.find((entry) => entry.email === email && entry.code === code);
    const user = store.users.find((entry) => entry.email === email);
    if (!otp || !user || new Date(otp.expiresAt).getTime() < Date.now()) {
      return { reset: false, email };
    }
    user.password = newPassword;
    user.updatedAt = new Date().toISOString();
    store.otps = store.otps.filter((entry) => !(entry.email === email && entry.code === code));
    return { reset: true, email };
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
  verifyOtp(@Body() body: { email: string; code: string }) {
    return this.authService.verifyOtp(body.email, body.code);
  }

  @Post("resend-otp")
  resendOtp(@Body() body: { email: string }) {
    return this.authService.resendOtp(body.email);
  }

  @Post("forgot-password")
  forgotPassword(@Body() body: { email: string }) {
    return this.authService.forgotPassword(body.email);
  }

  @Post("reset-password")
  resetPassword(@Body() body: { email: string; code: string; newPassword: string }) {
    return this.authService.resetPassword(body.email, body.code, body.newPassword);
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
