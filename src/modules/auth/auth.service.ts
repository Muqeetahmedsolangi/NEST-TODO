import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@modules/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { loginDto } from './dto/login.dto';

import * as bcrypt from 'bcryptjs';
import { User } from '@modules/users/entities/user.entity';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    private generateToken(id: number, email: string, role: string) {
        return this.jwtService.sign({
            sub: id,
            email,
            role,
        })
    }

    //-----Register
    async register(dto: RegisterDto) {
        const existing = await this.usersService.findByEmail(dto.email);
        if (existing) {
            throw new ConflictException('Email already exists');
        }

        const user = await this.usersService.create(dto);

        const token = this.generateToken(user.id, user.email, user.role);

        return {
            user: {
                message: "Registration Successful",
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            access_token: token,
        }
    }

    // -----login

    async login(dto: loginDto): Promise<any> {
        const user = await this.usersService.findByEmail(dto.email);
        if(!user) throw new UnauthorizedException('Invalid credentials');
        const isMatch = await bcrypt.compare(dto.password, user.password);

        if(!isMatch) throw new UnauthorizedException('Invalid credentials');

        const token = this.generateToken(user.id, user.email, user.role);

        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            access_token: token,
        }
    }

    // ----- getProfile 

    async getProfile(userId: number) {
        return this.usersService.findOne(userId);
    }
}
