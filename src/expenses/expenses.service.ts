import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Expense } from '../schemas/expenses.schema';
import { CreateExpenseDto } from './dto/create-expense.dto';

@Injectable()
export class ExpensesService {
    constructor(
        @InjectModel(Expense.name)
        private expenseModel: mongoose.Model<Expense>,
    ) {}

    async create(createExpenseDto: CreateExpenseDto): Promise<Expense> {
        console.log(CreateExpenseDto)
        return await new this.expenseModel(createExpenseDto).save();
    }

    async update(id: string, createExpenseDto: CreateExpenseDto): Promise<boolean> {
        return await this.expenseModel.findByIdAndUpdate(id, createExpenseDto, { new: true });
    }
}
