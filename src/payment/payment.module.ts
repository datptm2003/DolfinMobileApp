import { Module } from '@nestjs/common';
import { PaymentsController } from './payment.controller';
import { PaymentsService } from './payment.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentSchema } from '../schemas/payment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'Payment',
      schema: PaymentSchema
    }])
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService]
})
export class PaymentModule {}
