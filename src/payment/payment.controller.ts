// src/payments/payments.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentsService } from './payment.service';
import { Payment } from 'src/schemas/payment.schema';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  async create(@Body() newPayment: Payment): Promise<Object>  {
    // Here, you would normally perform any necessary validation or transformation
    try {
      const data = await this.paymentsService.create(newPayment);
      return {data}
    } catch (err) {
        return { message: err.message || 'Internal Server Error' };
    }
  }

  @Get()
  async findAll() {
    return this.paymentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.paymentsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    // Here too, any necessary validation or adjustment would need to be manually handled
    return this.paymentsService.update(id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.paymentsService.remove(id);
    return { message: 'Payment deleted successfully.' };
  }
}
