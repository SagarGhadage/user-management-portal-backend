import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { OtpDto, RefreshTokenDto } from './dto/otp.dto';
import * as bcrypt from 'bcrypt';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { EmailService } from 'src/email/email.service';
import { generateOtpDto } from './dto/generateOtp.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService
  ) { }

  async register(registerDto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const created = await this.usersService.create({
      ...registerDto,
      password: hashedPassword,
      status: 'Registered',
      otp: this.generateOtp()
    });

    await this.emailService.sendOTP(created.email, created.otp)

    const registered = { firstName: created.firstName, lastName: created.lastName, email: created.email, role: created.role }
    return registered
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (user && (await bcrypt.compare(loginDto.password, user.password))) {
      if (user.status !== "Verified") {
        throw new ConflictException('Not Verified!');
      }
      const payload = { email: user.email, sub: user._id, role: user.role };
      return {
        user: {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          status: user.status
        },
        accessToken: this.jwtService.sign(payload),
        refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
      };
    }
    throw new BadRequestException('Invalid credentials');
  }

  async refreshToken(body: RefreshTokenDto) {
    const payload = this.jwtService.verify(body.refreshToken, { secret: process.env.JWT_REFRESH_SECRET });
    if (!payload) {
      throw new UnauthorizedException('token expired!')
    }
    const newAccessToken = this.jwtService.sign({ sub: payload.sub, email: payload.email, role: payload.role }, { expiresIn: '15m' });
    return newAccessToken
  }

  async verifyOtp(otpDto: OtpDto) {
    const user = await this.usersService.findByEmail(otpDto.email);
    if (!user) {
      throw new NotFoundException("User Not Found " + otpDto.email)
    }
    if (user && user.otp === otpDto.otp) {
      user.status = 'Verified';
      user.otp = ""
      await this.usersService.update(user.id, user);
      return { message: 'OTP verified successfully' };
    }
    throw new BadRequestException('Invalid OTP');
  }
  private generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async regenerateOtp(body: generateOtpDto) {
    const user = await this.usersService.findByEmail(body.email);
    if (!user) {
      throw new NotFoundException('User not found ' + body.email)
    }
    const newOtp = this.generateOtp()
    const { otp, status } = await this.usersService.newOtp(user, newOtp)
    await this.emailService.sendOTP(body.email, otp)
    return "Otp sent to your mail " + body.email
  }
}