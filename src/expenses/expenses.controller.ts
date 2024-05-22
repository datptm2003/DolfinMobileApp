import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { Expense } from '../schemas/expenses.schema';
import { AuthGuard } from '../auth/auth.guard';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { GetMonthlyExpenseDto } from './dto/get-monthly-expense.dto';
import { GetDailyExpenseDto } from './dto/get-daily-expense.dto';

@Controller('expenses')
export class ExpensesController {
    constructor(private expenseService: ExpensesService) {}
    
    @UseGuards(AuthGuard)
    @Post()
    create(@Req() request: Request, @Body() createExpenseDto: CreateExpenseDto): Promise<Expense> {
        console.log(createExpenseDto);
        const userId = request['user_data'].id;
        return this.expenseService.create({...createExpenseDto, userID: userId});
    }

    @UseGuards(AuthGuard)
    @Put(':id')
    update(@Param('id') id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
        console.log(id)
        return this.expenseService.update(id, updateExpenseDto);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.expenseService.delete(id);
    }

    @UseGuards(AuthGuard)
    @Get('/totalexpense')
    getMonthlyExpense(@Req() request: Request, @Body() GetMonthlyExpense: GetMonthlyExpenseDto) {
        console.log(GetMonthlyExpense);
        const userId = request['user_data'].id;
        console.log(userId)
        return this.expenseService.getMonthlyExpense(userId, GetMonthlyExpense);
    }

    @UseGuards(AuthGuard)
    @Get()
    getDailyExpense(@Req() request: Request, @Body() getDailyExpense: GetDailyExpenseDto) {
        console.log(getDailyExpense);
        const userId = request['user_data'].id;
        console.log(userId)
        return this.expenseService.getDailyExpense(userId, getDailyExpense);
    }
}
