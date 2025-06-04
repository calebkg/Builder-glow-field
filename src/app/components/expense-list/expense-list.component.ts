import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { ExpenseService } from "../../services/expense.service";
import { Expense } from "../../models/expense.model";

@Component({
  selector: "app-expense-list",
  templateUrl: "./expense-list.component.html",
  styleUrls: ["./expense-list.component.css"],
})
export class ExpenseListComponent implements OnInit {
  expenses$!: Observable<Expense[]>;
  displayedColumns: string[] = [
    "title",
    "category",
    "amount",
    "date",
    "actions",
  ];
  searchTerm: string = "";
  selectedCategory: string = "";
  sortBy: string = "date";
  sortDirection: "asc" | "desc" = "desc";

  constructor(
    private expenseService: ExpenseService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.expenses$ = this.expenseService.getExpenses();
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  }

  editExpense(expense: Expense): void {
    this.router.navigate(["/edit-expense", expense.id]);
  }

  deleteExpense(expense: Expense): void {
    if (confirm(`Are you sure you want to delete "${expense.title}"?`)) {
      this.expenseService.deleteExpense(expense.id!).subscribe(() => {
        this.snackBar.open("Expense deleted successfully", "Close", {
          duration: 3000,
          panelClass: ["success-snackbar"],
        });
      });
    }
  }

  applyFilter(filterValue: string): void {
    this.searchTerm = filterValue.trim().toLowerCase();
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
  }

  sortExpenses(sortBy: string): void {
    if (this.sortBy === sortBy) {
      this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
    } else {
      this.sortBy = sortBy;
      this.sortDirection = "desc";
    }
  }

  getCategoryColor(category: string): string {
    const colors: { [key: string]: string } = {
      "Food & Dining": "#ff9800",
      Transportation: "#2196f3",
      Shopping: "#e91e63",
      Entertainment: "#9c27b0",
      "Bills & Utilities": "#f44336",
      Healthcare: "#4caf50",
      Education: "#795548",
      Other: "#607d8b",
    };
    return colors[category] || "#607d8b";
  }

  getFilteredAndSortedExpenses(expenses: Expense[]): Expense[] {
    let filtered = expenses;

    // Apply search filter
    if (this.searchTerm) {
      filtered = filtered.filter(
        (expense) =>
          expense.title.toLowerCase().includes(this.searchTerm) ||
          expense.category.toLowerCase().includes(this.searchTerm) ||
          (expense.description &&
            expense.description.toLowerCase().includes(this.searchTerm)),
      );
    }

    // Apply category filter
    if (this.selectedCategory) {
      filtered = filtered.filter(
        (expense) => expense.category === this.selectedCategory,
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let valueA: any, valueB: any;

      switch (this.sortBy) {
        case "title":
          valueA = a.title.toLowerCase();
          valueB = b.title.toLowerCase();
          break;
        case "amount":
          valueA = a.amount;
          valueB = b.amount;
          break;
        case "category":
          valueA = a.category.toLowerCase();
          valueB = b.category.toLowerCase();
          break;
        case "date":
        default:
          valueA = new Date(a.date).getTime();
          valueB = new Date(b.date).getTime();
          break;
      }

      if (valueA < valueB) {
        return this.sortDirection === "asc" ? -1 : 1;
      }
      if (valueA > valueB) {
        return this.sortDirection === "asc" ? 1 : -1;
      }
      return 0;
    });

    return filtered;
  }

  getUniqueCategories(expenses: Expense[]): string[] {
    return [...new Set(expenses.map((expense) => expense.category))].sort();
  }

  clearFilters(): void {
    this.searchTerm = "";
    this.selectedCategory = "";
    this.sortBy = "date";
    this.sortDirection = "desc";
  }
}
