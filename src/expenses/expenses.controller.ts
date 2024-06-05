import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { Expense } from '../schemas/expenses.schema';
import { AuthGuard } from '../auth/auth.guard';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { GetMonthlyExpenseDto } from './dto/get-monthly-expense.dto';
import { GetDailyExpenseDto } from './dto/get-daily-expense.dto';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Expenses')
@Controller('expenses')
export class ExpensesController {
    constructor(private expenseService: ExpensesService) {}
    
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Create An Expense' })
    @ApiBearerAuth('access-token')
    @Post()
    create(@Req() request: Request, @Body() createExpenseDto: CreateExpenseDto): Promise<Expense> {
        console.log(createExpenseDto);
        const userId = request['user_data'].id;
        return this.expenseService.create({...createExpenseDto, userID: userId});
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Update An Expense' })
    @Put(':id')
    update(@Param('id') id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
        console.log(id)
        return this.expenseService.update(id, updateExpenseDto);
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Delete An Expense' })
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.expenseService.delete(id);
    }

    @UseGuards(AuthGuard)
    @Get('/totalexpense')
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Get Monthly Expense Total' })
    @ApiQuery({ name: 'month', required: true, type: Number })
    @ApiQuery({ name: 'year', required: true, type: Number })
    getMonthlyExpense(@Req() request: Request, @Query('month') month: number, @Query('year') year: number) {
        const userId = request['user_data'].id;
        return this.expenseService.getMonthlyExpense(userId, month, year);
    }

    @UseGuards(AuthGuard)
    @Get()
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Get Daily Expenses' })
    @ApiQuery({ name: 'day', required: true, type: Number })
    @ApiQuery({ name: 'month', required: true, type: Number })
    @ApiQuery({ name: 'year', required: true, type: Number })
    getDailyExpense(@Req() request: Request, @Query('day') day: number, @Query('month') month: number, @Query('year') year: number) {
        const userId = request['user_data'].id;
        console.log(userId)
        return this.expenseService.getDailyExpense(userId, day, month, year);
    }

    @UseGuards(AuthGuard)
    @Get('/MonthlyExpenses')
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Get Monthly Expenses' })
    @ApiQuery({ name: 'month', required: true, type: Number })
    @ApiQuery({ name: 'year', required: true, type: Number })
    getMonthlyExpenses(@Req() request: Request, @Query('month') month: number, @Query('year') year: number) {
        const userId = request['user_data'].id;
        console.log(userId)
        return this.expenseService.getMonthlyExpenses(userId, month, year);
    }
}
