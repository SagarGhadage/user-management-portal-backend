import { IsEmail, IsNotEmpty, IsString, IsEnum } from 'class-validator';

export class RegisterDto {
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsEnum(['Admin', 'User', 'Manager'])
    role: 'Admin' | 'User' | 'Manager';
}