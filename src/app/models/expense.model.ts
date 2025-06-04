export interface Expense {
  id?: number;
  title: string;
  amount: number;
  category: string;
  description?: string;
  date: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ExpenseCategory {
  id: number;
  name: string;
  icon?: string;
  color?: string;
}

export interface ExpenseStats {
  totalExpenses: number;
  monthlyTotal: number;
  categoriesBreakdown: { [category: string]: number };
  recentTransactions: Expense[];
}
