import { IsNotEmpty, IsString } from 'class-validator';

export class OtpDto {
  @IsNotEmpty()
  @IsString()
  readonly otp: string;

  @IsNotEmpty()
  @IsString()
  readonly email: string;
}
export class RefreshTokenDto {
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}