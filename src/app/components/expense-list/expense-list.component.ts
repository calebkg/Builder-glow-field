import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { ExpenseService } from "../../services/expense.service";
import { Expense, ExpenseCategory } from "../../models/expense.model";

@Component({
  selector: "app-expense-list",
  templateUrl: "./expense-list.component.html",
  styleUrls: ["./expense-list.component.css"],
})
export class ExpenseListComponent implements OnInit {
  expenses$!: Observable<Expense[]>;
  categories: ExpenseCategory[] = [];
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
    this.expenseService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
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

  getCategoryName(categoryId: number): string {
    const category = this.categories.find(cat => cat.id === categoryId);
    return category ? category.name : '';
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
          this.getCategoryName(expense.categoryId).toLowerCase().includes(this.searchTerm) ||
          (expense.description &&
            expense.description.toLowerCase().includes(this.searchTerm)),
      );
    }

    // Apply category filter
    if (this.selectedCategory) {
      filtered = filtered.filter(
        (expense) => this.getCategoryName(expense.categoryId) === this.selectedCategory,
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
          valueA = this.getCategoryName(a.categoryId).toLowerCase();
          valueB = this.getCategoryName(b.categoryId).toLowerCase();
          break;
        case "date":
        default:
          valueA = new Date(a.expenseDate).getTime();
          valueB = new Date(b.expenseDate).getTime();
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
    return [...new Set(expenses.map((expense) => this.getCategoryName(expense.categoryId)))].sort();
  }

  clearFilters(): void {
    this.searchTerm = "";
    this.selectedCategory = "";
    this.sortBy = "date";
    this.sortDirection = "desc";
  }
}
