export class CreateIncomeDto {
  userID: string;

  amount: number;

  description: string;

  category: string;

  date: Date;

  time: string;

  isScheduled: boolean;
}