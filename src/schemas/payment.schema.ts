import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../schemas/user.schema';

export type PaymentDocument = Payment & Document;

@Schema()
export class Payment {
  @Prop({ required: true, type: Number, min: 0.01 })
  amount: number;

  @Prop({ required: true, type: String, maxlength: 255 })
  description: string;

  @Prop({ required: true, type: String })
  category: string;

  @Prop({ required: true, type: Date })
  date: Date;

  @Prop({ required: true, type: String })
  time: string;

  @Prop({ required: true, type: Boolean })
  isScheduled: boolean;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);