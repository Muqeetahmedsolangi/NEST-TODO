import { Injectable, NotFoundException, ConflictException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    findById: any;
    findByPk(userId: number) {
        throw new Error('Method not implemented.');
    }
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    // ------ Create New User ----------
  async create(dto: CreateUserDto): Promise<User> {
    const existing = await this.usersRepository.findOne({
      where: { email: dto.email },
    });

    if (existing) {
      throw new ConflictException('Email already exists');
    }

    const user = this.usersRepository.create(dto);
    return this.usersRepository.save(user);
  }

    // ------ Get All Users ----------
   async findAll(): Promise<User[]>{
    return this.usersRepository.find({
     select: ['id', 'name', 'email', 'role', 'isActive', 'createdAt', 'updatedAt'],
    });
   }

    // ------ Get User By ID ----------
   async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
        where: { id },
        select: ['id', 'name', 'email', 'role', 'isActive', 'createdAt', 'updatedAt'],
    });

    if (!user) {
        throw new NotFoundException('User not found');
    }

    return user;
}

    // ------ get user by email
    async findByEmail(email : string): Promise<User>{
        const user = await this.usersRepository.findOne({
            where: {email: email},
            select: ['id', 'name', 'email', 'password', 'role', 'isActive', 'createdAt', 'updatedAt'],
        })
        if(!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    // ------ User Update ---------
    async update(id: number, dto: UpdateUserDto): Promise<User> {
        const user = await this.findOne(id);
        Object.assign(user, dto);
        return this.usersRepository.save(user);
    }

    // ------- User Delete ---------
    async remove(id: number): Promise<{message: string}> {
        await this.findOne(id);
        await this.usersRepository.delete(id);
        return {message: `${id} deleted successfully`};
    }
}
