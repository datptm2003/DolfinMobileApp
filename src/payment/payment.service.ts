// src/payments/payments.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payment, PaymentDocument } from '../schemas/payment.schema';

@Injectable()
export class PaymentsService {
  constructor(@InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>) {}

  async create({
      amount,
      description,
      category,
      user: userId
  }): Promise<Payment> {
    // const { amount, description, category, userId} = body;
    // Additional validation can be added here if necessary
    const createdPayment =  await this.paymentModel.create({
      amount,
      description,
      category,
      user: userId
    });
    return createdPayment;
  }

  async findAll(): Promise<Payment[]> {
    return this.paymentModel.find().populate('user').exec();
  }

  async findOne(id: string): Promise<Payment> {
    const payment = await this.paymentModel.findById(id).populate('user').exec();
    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
    return payment;
  }

  async update(id: string, body: any): Promise<Payment> {
    const updatedPayment = await this.paymentModel.findByIdAndUpdate(id, body, { new: true }).populate('user').exec();
    if (!updatedPayment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
    return updatedPayment;
  }

  async remove(id: string): Promise<void> {
    const result = await this.paymentModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
  }
}
