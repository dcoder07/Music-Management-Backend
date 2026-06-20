import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserRequest, UserResponse } from './dto/createUserReqRes';
import { GetAllUsersResponse, UserDTO } from './dto/getAllUsersRes';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async getAllUsers(): Promise<GetAllUsersResponse> {
        const response = await this.userRepository.find();
        if (!response) {
            throw new NotFoundException('Users not found');
        }
        return { users: response, isSuccess: true };
    }

    async createUser(requestBody: CreateUserRequest): Promise<UserResponse> {
        const response = this.userRepository.create(requestBody);
        const userSavedRes = await this.userRepository.save(response);
        if (!response || !userSavedRes) {
            throw new NotFoundException('Failed to save user to database');
        }
        return { message: 'User created successfully', data: userSavedRes, isSuccess: true };
    }

    async getUserById(id: number): Promise<UserDTO> {
        const response = await this.userRepository.findOne({ where: { id: id } });
        if (!response) {
            throw new NotFoundException('User not found');
        }
        return response;
    }

    async updateUser(id: number, requestBody: CreateUserRequest): Promise<UserResponse> {
        const response = await this.userRepository.update({ id: id }, requestBody);
        if (!response) {
            throw new NotFoundException('Failed to update user');
        }
        return { message: 'User updated successfully', isSuccess: true };
    }
}
