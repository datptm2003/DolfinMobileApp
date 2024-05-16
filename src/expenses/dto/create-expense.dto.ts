export class CreateExpenseDto {
  userID: string;

  amount: number;

  description: string;

  category: string;

  date: Date;

  time: string;
}