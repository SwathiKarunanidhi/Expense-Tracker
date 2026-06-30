export interface ExpenseItem {
  id: number;
  title: string;
  amount: number;
  category: string;
  date: string;
}

export interface BudgetItem {
  id: number;
  category: string;
  title: string;
  allocated: number;
}

export interface Savings {
  id: number;
  title: string;
  amount: number;
  category: string;
  date: string;
}
