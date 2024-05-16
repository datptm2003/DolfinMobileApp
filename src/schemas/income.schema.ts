// src/payments/schemas/payment.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../schemas/user.schema';

export type IncomeDocument = Income & Document;

@Schema()
export class Income {
  @Prop({ required: true, type: Number, min: 0.01 })
  amount: number;

  @Prop({ required: true, type: String, maxlength: 255 })
  description: string;

  @Prop({ required: true, type: String })
  category: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User | Types.ObjectId;

  @Prop({ required: true, type: Date })
  date: Date;

  @Prop({ required: true, type: String })
  time: string;

  @Prop({ required: true, type: Boolean })
  isScheduled: boolean;
}

export const IncomeSchema = SchemaFactory.createForClass(Income);