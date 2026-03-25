import {IsEmail, IsOptional, IsString, MinLength} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
    @ApiPropertyOptional({example: 'Johm Deo'})
    @IsString()
    @IsOptional()
    name: string;

    @ApiPropertyOptional({example: 'newPassword123'})
    @IsString()
    @MinLength(6)
    @IsOptional()
    password: string;
}