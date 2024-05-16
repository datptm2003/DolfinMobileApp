import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from '../schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private userModel: mongoose.Model<User>,
    ) {}

    //getAllUsers
    async findAll(): Promise<User[]> {

        const users = await this.userModel.find()

        return users
    }

    async findOne(id: string): Promise<User> {
        return await this.userModel.findById(id);
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const hashPassword = await bcrypt.hash(createUserDto.password, 10);
        return await new this.userModel({ ...createUserDto, password: hashPassword }).save();
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<boolean> {
        return await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
    }

    async delete(id: string): Promise<boolean> {
        return await this.userModel.findByIdAndDelete(id);
    }
}
