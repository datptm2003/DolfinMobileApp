import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Expense } from '../schemas/expenses.schema';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { GetMonthlyExpenseDto } from './dto/get-monthly-expense.dto';
import { GetDailyExpenseDto } from './dto/get-daily-expense.dto';

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

    async delete(id: string): Promise<boolean> {
        return await this.expenseModel.findByIdAndDelete(id);
    }

    async getMonthlyExpense(id: string, month: number, year: number): Promise<number> {
        // Calculate the start and end dates of the month
        console.log(" month:", month, " year:", year);
        const startDate = new Date(year, month - 1, 1);
        console.log(" startDate:", startDate);
        const endDate = new Date(year, month, 0, 23, 59, 59, 999);

        // Fetch and sum the expenses for the specified month
        const expenses = await this.expenseModel.find({
            userID: id,
            date: { $gte: startDate, $lte: endDate },
        });

        console.log(expenses);

        // Sum the amount fields
        const totalExpense = expenses.reduce((total, expense) => total + expense['amount'], 0);
        return totalExpense;
    }

    async getDailyExpense(id: string, day: number, month: number, year: number): Promise<Object> {
        const startDate = new Date(
            year, 
            month - 1, 
            day, 0, 0, 0, 0
        );
        const endDate = new Date(
            year, 
            month - 1, 
            day, 23, 59, 59, 999
        );

        // Fetch and sum the expenses for the specified day
        const expenses = await this.expenseModel.find({
            userID: id,
            date: { $gte: startDate, $lte: endDate },
        }).exec();

        console.log(expenses);

        return expenses;
    }

    async getMonthlyExpenses(id: string, month: number, year: number): Promise<Object> {
        // Start date should be the first day of the month at 00:00:00.000
        const startDate = new Date(year, month - 1, 1, 0, 0, 0, 0);
    
        // End date should be the last day of the month at 23:59:59.999
        const endDate = new Date(year, month, 0, 23, 59, 59, 999);
    
        // Fetch the expenses for the specified month
        const expenses = await this.expenseModel.find({
            userID: id,
            date: { $gte: startDate, $lte: endDate },
        }).exec();
    
        // Return the total expenses
        return expenses;
    }
    
}
