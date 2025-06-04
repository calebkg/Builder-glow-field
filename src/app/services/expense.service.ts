import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import {
  Expense,
  ExpenseCategory,
  ExpenseStats,
} from "../models/expense.model";

@Injectable({
  providedIn: "root",
})
export class ExpenseService {
  private expensesSubject = new BehaviorSubject<Expense[]>([]);
  public expenses$ = this.expensesSubject.asObservable();

  private categories: ExpenseCategory[] = [
    { id: 1, name: "Food & Dining", icon: "restaurant", color: "#ff9800" },
    { id: 2, name: "Transportation", icon: "directions_car", color: "#2196f3" },
    { id: 3, name: "Shopping", icon: "shopping_cart", color: "#e91e63" },
    { id: 4, name: "Entertainment", icon: "movie", color: "#9c27b0" },
    { id: 5, name: "Bills & Utilities", icon: "receipt", color: "#f44336" },
    { id: 6, name: "Healthcare", icon: "local_hospital", color: "#4caf50" },
    { id: 7, name: "Education", icon: "school", color: "#795548" },
    { id: 8, name: "Other", icon: "category", color: "#607d8b" },
  ];

  private mockExpenses: Expense[] = [
    {
      id: 1,
      title: "Grocery Shopping",
      amount: 45.67,
      category: "Food & Dining",
      description: "Weekly groceries from supermarket",
      date: new Date("2024-01-15"),
      createdAt: new Date("2024-01-15"),
    },
    {
      id: 2,
      title: "Gas Station",
      amount: 32.5,
      category: "Transportation",
      description: "Fuel for the car",
      date: new Date("2024-01-14"),
      createdAt: new Date("2024-01-14"),
    },
    {
      id: 3,
      title: "Netflix Subscription",
      amount: 12.99,
      category: "Entertainment",
      description: "Monthly subscription",
      date: new Date("2024-01-13"),
      createdAt: new Date("2024-01-13"),
    },
    {
      id: 4,
      title: "Coffee Shop",
      amount: 8.75,
      category: "Food & Dining",
      description: "Morning coffee and pastry",
      date: new Date("2024-01-12"),
      createdAt: new Date("2024-01-12"),
    },
    {
      id: 5,
      title: "Electric Bill",
      amount: 89.25,
      category: "Bills & Utilities",
      description: "Monthly electricity payment",
      date: new Date("2024-01-10"),
      createdAt: new Date("2024-01-10"),
    },
  ];

  constructor() {
    this.expensesSubject.next(this.mockExpenses);
  }

  getExpenses(): Observable<Expense[]> {
    return this.expenses$;
  }

  getExpenseById(id: number): Observable<Expense | undefined> {
    const expenses = this.expensesSubject.value;
    return of(expenses.find((expense) => expense.id === id));
  }

  addExpense(expense: Expense): Observable<Expense> {
    const expenses = this.expensesSubject.value;
    const newExpense = {
      ...expense,
      id: Math.max(...expenses.map((e) => e.id || 0)) + 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const updatedExpenses = [...expenses, newExpense];
    this.expensesSubject.next(updatedExpenses);

    return of(newExpense);
  }

  updateExpense(expense: Expense): Observable<Expense> {
    const expenses = this.expensesSubject.value;
    const updatedExpense = { ...expense, updatedAt: new Date() };
    const updatedExpenses = expenses.map((e) =>
      e.id === expense.id ? updatedExpense : e,
    );

    this.expensesSubject.next(updatedExpenses);
    return of(updatedExpense);
  }

  deleteExpense(id: number): Observable<boolean> {
    const expenses = this.expensesSubject.value;
    const updatedExpenses = expenses.filter((e) => e.id !== id);
    this.expensesSubject.next(updatedExpenses);
    return of(true);
  }

  getCategories(): Observable<ExpenseCategory[]> {
    return of(this.categories);
  }

  getExpenseStats(): Observable<ExpenseStats> {
    const expenses = this.expensesSubject.value;
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const monthlyExpenses = expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      return (
        expenseDate.getMonth() === currentMonth &&
        expenseDate.getFullYear() === currentYear
      );
    });

    const totalExpenses = expenses.reduce(
      (sum, expense) => sum + expense.amount,
      0,
    );
    const monthlyTotal = monthlyExpenses.reduce(
      (sum, expense) => sum + expense.amount,
      0,
    );

    const categoriesBreakdown: { [category: string]: number } = {};
    expenses.forEach((expense) => {
      categoriesBreakdown[expense.category] =
        (categoriesBreakdown[expense.category] || 0) + expense.amount;
    });

    const recentTransactions = expenses
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);

    return of({
      totalExpenses,
      monthlyTotal,
      categoriesBreakdown,
      recentTransactions,
    });
  }
}
