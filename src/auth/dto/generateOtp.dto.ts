import { IsEmail, IsNotEmpty } from 'class-validator';

export class generateOtpDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;
}