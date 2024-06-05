import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../schemas/user.schema';
import { AuthGuard } from '../auth/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    // @UseGuards(AuthGuard)
    // @Get()
    // @ApiOperation({ summary: 'Get all users' })
    // async getAll(@Req() request: Request): Promise<User[]> {
    //     const userId = request['user_data'].id;
    //     console.log(userId);
    //     const data = await this.userService.findAll()
    //     return data
    // }

    @UseGuards(AuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Get User Information' })
    @Get()
    findOne(@Req() request: Request): Promise<User> {
        const id = request['user_data'].id;
        return this.userService.findOne(id);
    }

    // @UseGuards(AuthGuard)
    // @Post()
    // create(@Body() createUserDto: CreateUserDto): Promise<User> {
    //     return this.userService.create(createUserDto);
    // }

    @UseGuards(AuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Update User Information' })
    @Put()
    update(@Req() request: Request, @Body() updateUserDto: UpdateUserDto) {
        const id = request['user_data'].id;

        return this.userService.update(id, updateUserDto);
    }

    // @UseGuards(AuthGuard)
    // @ApiBearerAuth('access-token')
    // @Delete(':id')
    // delete(@Param('id') id: string) {
    //     return this.userService.delete(id);
    // }
}
