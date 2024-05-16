import { Body, Controller, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { Expense } from 'src/schemas/expenses.schema';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

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
}
