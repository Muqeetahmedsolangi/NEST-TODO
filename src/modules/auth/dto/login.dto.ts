import { IsEmail, IsNotEmpty, IsString, MinLength} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class loginDto {
    @ApiProperty({example: 'john@example.com'})
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({example: 'password123'})
    @IsString()
    @IsNotEmpty()
    password: string;       
}