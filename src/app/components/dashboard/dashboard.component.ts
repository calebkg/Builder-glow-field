import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { ExpenseService } from "../../services/expense.service";
import { ExpenseStats, Expense, ExpenseCategory } from "../../models/expense.model";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  stats$!: Observable<ExpenseStats>;
  categories: ExpenseCategory[] = [];

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.stats$ = this.expenseService.getExpenseStats();
    this.expenseService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  getCategoryKeys(categoriesBreakdown: {
    [category: string]: number;
  }): string[] {
    return Object.keys(categoriesBreakdown);
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
    }).format(amount);
  }

  getMonthName(): string {
    const month = new Date().toLocaleString("default", { month: "long" });
    return month;
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find(cat => cat.id === categoryId);
    return category ? category.name : '';
  }
}
