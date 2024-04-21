import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../schemas/user.schema';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @Post()
    async create(@Body() newUser: User): Promise<Object> {
        try {
            const data = await this.userService.create(newUser);
            return {data}
        } catch (err) {
            return { message: err.message || 'Internal Server Error' };
        }
    }

    @Get()
    async getAll(): Promise<Object> {
        try {
            const data = await this.userService.findAll()
            return {data}
        } catch (err) {
            return { message: err.message || 'Internal Server Error' };
        }
    }

    @Get('/:id')
    async getById(@Param('id') user_id: string): Promise<Object> {
        try {
            const data = await this.userService.findById(user_id)
            return {data}
        } catch (err) {
            return { message: err.message || 'Internal Server Error' };
        }
    }

    @Patch('/:id')
    async updateById(
        @Param('id') user_id: string, 
        @Body() updateProps: Partial<User>
    ): Promise<Object> {
        try {
            const {firstName, lastName} = updateProps
            const data = await this.userService.updateById({user_id, firstName, lastName})
            return {data}
        } catch (err) {
            return { message: err.message || 'Internal Server Error' };
        }
    }

    @Delete('/:id')
    async deleteById(
        @Param('id') user_id: string
    ): Promise<Object> {
        try {
            const data = await this.userService.deleteById(user_id)
            return {message: data}
        } catch (err) {
            return { message: err.message || 'Internal Server Error' };
        }
    }
}
