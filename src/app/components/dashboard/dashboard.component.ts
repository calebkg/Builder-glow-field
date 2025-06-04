import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { ExpenseService } from "../../services/expense.service";
import { ExpenseStats, Expense } from "../../models/expense.model";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  stats$!: Observable<ExpenseStats>;

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.stats$ = this.expenseService.getExpenseStats();
  }

  getCategoryKeys(categoriesBreakdown: {
    [category: string]: number;
  }): string[] {
    return Object.keys(categoriesBreakdown);
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  }

  getMonthName(): string {
    const month = new Date().toLocaleString("default", { month: "long" });
    return month;
  }
}
