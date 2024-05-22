import { Module } from '@nestjs/common';
import { IncomesController } from './income.controller';
import { IncomesService } from './income.service';
import { MongooseModule } from '@nestjs/mongoose';
import { IncomeSchema } from 'src/schemas/income.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'Income',
      schema: IncomeSchema
    }]),
    ConfigModule
  ],
  controllers: [IncomesController],
  providers: [IncomesService]
})
export class IncomeModule {}
