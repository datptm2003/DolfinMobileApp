import { ApiProperty } from "@nestjs/swagger";

export class CreateIncomeDto {
  userID: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  category: string;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  time: string;

  @ApiProperty()
  isScheduled: boolean;
}