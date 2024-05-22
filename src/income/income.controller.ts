import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { IncomesService } from './income.service';
import { Income } from '../schemas/income.schema';
import { AuthGuard } from '../auth/auth.guard';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { GetMonthlyIncomeDto } from './dto/get-monthly-income.dto';
import { GetDailyIncomeDto } from './dto/get-daily-income.dto';

@Controller('incomes')
export class IncomesController {
    constructor(private incomeService: IncomesService) {}
    
    @UseGuards(AuthGuard)
    @Post()
    create(@Req() request: Request, @Body() createIncomeDto: CreateIncomeDto): Promise<Income> {
        console.log("controller", createIncomeDto);
        const userId = request['user_data'].id;
        return this.incomeService.create({...createIncomeDto, userID: userId});
    }

    @UseGuards(AuthGuard)
    @Put(':id')
    update(@Param('id') id: string, @Body() updateIncomeDto: UpdateIncomeDto) {
        console.log(id)
        return this.incomeService.update(id, updateIncomeDto);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.incomeService.delete(id);
    }

    @UseGuards(AuthGuard)
    @Get('/totalincome')
    getMonthlyIncome(@Req() request: Request, @Body() GetMonthlyIncome: GetMonthlyIncomeDto) {
        console.log(GetMonthlyIncome);
        const userId = request['user_data'].id;
        console.log(userId)
        return this.incomeService.getMonthlyIncome(userId, GetMonthlyIncome);
    }

    @UseGuards(AuthGuard)
    @Get()
    getDailyIncome(@Req() request: Request, @Body() getDailyIncome: GetDailyIncomeDto) {
        console.log(getDailyIncome);
        const userId = request['user_data'].id;
        console.log(userId)
        return this.incomeService.getDailyIncome(userId, getDailyIncome);
    }
}
