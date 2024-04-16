import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name)
        private userModel: mongoose.Model<User>,
    ) {}

    //New user
    async create({
        email,
        password,
        firstName,
        lastName
    }): Promise<User> {

        const user = await this.userModel.create({
            email,
            password,
            firstName,
            lastName
        })

        return user
    }

    //getAllUsers

    async findAll(): Promise<User[]> {

        const users = await this.userModel.find()

        return users
    }

    //findById
    async findById(user_id): Promise<User>{

        const user = await this.userModel.findById(user_id)
        if(!user) {
            return Promise.reject({
                status: 404,
                message: `User with id=${user_id} not found!`
            })
        }

        return user
    }

    //updateById
    async updateById({
        user_id,
        firstName,
        lastName
    }): Promise<User>{

        let updates: Partial<User> = {}
        if (firstName) { updates.firstName = firstName}
        if (lastName) { updates.lastName = lastName}

        const user = await this.userModel.findByIdAndUpdate(
            user_id,
            updates,
            { new: true }
        )

        if(!user) {
            return Promise.reject({
                status: 404,
                message: `User with id=${user_id} not found!`
            })
        }

        return user
    }

    //DeleteById
    async deleteById(user_id: string): Promise<String> {

        const user  = await this.userModel.findByIdAndDelete(user_id)

        if(!user) {
            return Promise.reject({
                status: 404,
                message: `User with id=${user_id} not found!`
            })
        }

        return  `User with id=${user_id} deleted successfully!`
    }
}
