import { Controller, Get, Post, Put, Param, Body, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserRequest, UserResponse } from './dto/createUserReqRes';
import { GetAllUsersResponse, UserDTO } from './dto/getAllUsersRes';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    async findAll(): Promise<GetAllUsersResponse> {
        try {
            return await this.usersService.getAllUsers();
        } catch (error) {
            throw error;
        }
    }

    @Get(':id')
    async findOne(@Param('id', new ParseIntPipe()) id: number): Promise<UserDTO> {
        try {
            return await this.usersService.getUserById(id);
        } catch (error) {
            throw error;
        }
    }

    @Post()
    async create(@Body() body: CreateUserRequest): Promise<UserResponse> {
        try {
            return await this.usersService.createUser(body);
        } catch (error) {
            throw error;
        }
    }

    @Put(':id')
    async update(@Param('id', new ParseIntPipe()) id: number, @Body() body: CreateUserRequest): Promise<UserResponse> {
        try {
            return await this.usersService.updateUser(id, body);
        } catch (error) {
            throw error;
        }
    }
}
