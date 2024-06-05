import { ApiProperty } from "@nestjs/swagger";

export class CreateExpenseDto {
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
}