import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../../environments/environment";
import {
  Expense,
  ExpenseCategory,
  ExpenseStats,
} from "../models/expense.model";

@Injectable({
  providedIn: "root",
})
export class ExpenseService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.apiUrl}/expenses`);
  }

  getExpenseById(id: number): Observable<Expense> {
    return this.http.get<Expense>(`${this.apiUrl}/expenses/${id}`);
  }

  addExpense(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(`${this.apiUrl}/expenses`, expense);
  }

  updateExpense(expense: Expense): Observable<Expense> {
    return this.http.put<Expense>(`${this.apiUrl}/expenses/${expense.id}`, expense);
  }

  deleteExpense(id: number): Observable<boolean> {
    return this.http.delete(`${this.apiUrl}/expenses/${id}`).pipe(
      map(() => true)
    );
  }

  getCategories(): Observable<ExpenseCategory[]> {
    return this.http.get<ExpenseCategory[]>(`${this.apiUrl}/categories`);
  }

  getExpenseStats(): Observable<ExpenseStats> {
    return this.http.get<ExpenseStats>(`${this.apiUrl}/expenses/stats`);
  }
}
