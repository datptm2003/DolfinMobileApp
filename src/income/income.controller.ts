import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { IncomesService } from './income.service';
import { Income } from '../schemas/income.schema';
import { AuthGuard } from '../auth/auth.guard';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { GetMonthlyIncomeDto } from './dto/get-monthly-income.dto';
import { GetDailyIncomeDto } from './dto/get-daily-income.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Income')
@Controller('incomes')
export class IncomesController {
    constructor(private incomeService: IncomesService) {}
    
    @UseGuards(AuthGuard)
    @ApiBearerAuth('access-token')
    @Post()
    create(@Req() request: Request, @Body() createIncomeDto: CreateIncomeDto): Promise<Income> {
        console.log("controller", createIncomeDto);
        const userId = request['user_data'].id;
        return this.incomeService.create({...createIncomeDto, userID: userId});
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth('access-token')
    @Put(':id')
    update(@Param('id') id: string, @Body() updateIncomeDto: UpdateIncomeDto) {
        console.log(id)
        return this.incomeService.update(id, updateIncomeDto);
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth('access-token')
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.incomeService.delete(id);
    }

    @UseGuards(AuthGuard)
    @Get('/totalincome')
    @ApiBearerAuth('access-token')
    @ApiQuery({ name: 'month', required: true, type: Number })
    @ApiQuery({ name: 'year', required: true, type: Number })
    getMonthlyIncome(@Req() request: Request, @Query('month') month: number, @Query('year') year: number) {
        const userId = request['user_data'].id;
        console.log(userId)
        return this.incomeService.getMonthlyIncome(userId, month, year);
    }

    @UseGuards(AuthGuard)
    @Get()
    @ApiBearerAuth('access-token')
    @ApiQuery({ name: 'day', required: true, type: Number })
    @ApiQuery({ name: 'month', required: true, type: Number })
    @ApiQuery({ name: 'year', required: true, type: Number })
    getDailyIncome(@Req() request: Request, @Query('day') day: number, @Query('month') month: number, @Query('year') year: number) {
        const userId = request['user_data'].id;
        console.log(userId)
        return this.incomeService.getDailyIncome(userId, day, month, year);
    }
}
