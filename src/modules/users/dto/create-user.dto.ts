import {IsEmail, IsNotEmpty, IsString, MinLength} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({example: 'John Deo'})
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({example: 'john.deo@example.com'})
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({example: 'password123'})
    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    password: string;
}