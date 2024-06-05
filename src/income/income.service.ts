import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Income } from '../schemas/income.schema';
import { CreateIncomeDto } from './dto/create-income.dto';
import { GetMonthlyIncomeDto } from './dto/get-monthly-income.dto';
import { GetDailyIncomeDto } from './dto/get-daily-income.dto';

@Injectable()
export class IncomesService {
    constructor(
        @InjectModel(Income.name)
        private incomeModel: mongoose.Model<Income>,
    ) {}

    async create(createIncomeDto: CreateIncomeDto): Promise<Income> {
        console.log(createIncomeDto)
        return await new this.incomeModel(createIncomeDto).save();
    }

    async update(id: string, createIncomeDto: CreateIncomeDto): Promise<boolean> {
        return await this.incomeModel.findByIdAndUpdate(id, createIncomeDto, { new: true });
    }

    async delete(id: string): Promise<boolean> {
        return await this.incomeModel.findByIdAndDelete(id);
    }

    async getMonthlyIncome(id: string, month: number, year: number): Promise<number> {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0, 23, 59, 59, 999);

        const incomes = await this.incomeModel.find({
            userID: id,
            date: { $gte: startDate, $lte: endDate },
        });

        console.log(incomes);

        // Sum the amount fields
        const totalIncome = incomes.reduce((total, income) => total + income['amount'], 0);
        return totalIncome;
    }

    async getDailyIncome(id: string, day: number, month: number, year: number): Promise<Object> {
        // Calculate the start and end times of the specified day
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

        console.log("Start Date", startDate);
        console.log("End Date", endDate);
        // Fetch and sum the incomes for the specified day
        const incomes = await this.incomeModel.find({
            userID: id,
            date: { $gte: startDate, $lte: endDate },
        }).exec();

        console.log(incomes);

        return incomes;
    }

    async getMonthlyIncomes(id: string, month: number, year: number): Promise<Object> {
        // Start date should be the first day of the month at 00:00:00.000
        const startDate = new Date(year, month - 1, 1, 0, 0, 0, 0);
    
        // End date should be the last day of the month at 23:59:59.999
        const endDate = new Date(year, month, 0, 23, 59, 59, 999);
    
        // Fetch the expenses for the specified month
        const expenses = await this.incomeModel.find({
            userID: id,
            date: { $gte: startDate, $lte: endDate },
        }).exec();
    
        // Return the total expenses
        return expenses;
    }
}
