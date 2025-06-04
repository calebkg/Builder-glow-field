import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable } from "rxjs";
import { ExpenseService } from "../../services/expense.service";
import { Expense, ExpenseCategory } from "../../models/expense.model";

@Component({
  selector: "app-add-expense",
  templateUrl: "./add-expense.component.html",
  styleUrls: ["./add-expense.component.css"],
})
export class AddExpenseComponent implements OnInit {
  expenseForm!: FormGroup;
  categories$!: Observable<ExpenseCategory[]>;
  isEditMode = false;
  expenseId?: number;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private expenseService: ExpenseService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.categories$ = this.expenseService.getCategories();

    // Check if we're in edit mode
    this.route.paramMap.subscribe((params) => {
      const id = params.get("id");
      if (id) {
        this.isEditMode = true;
        this.expenseId = +id;
        this.loadExpense(this.expenseId);
      }
    });
  }

  initializeForm(): void {
    this.expenseForm = this.fb.group({
      title: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
        ],
      ],
      amount: [
        "",
        [Validators.required, Validators.min(0.01), Validators.max(999999.99)],
      ],
      category: ["", Validators.required],
      description: ["", Validators.maxLength(500)],
      date: [new Date(), Validators.required],
    });
  }

  loadExpense(id: number): void {
    this.isLoading = true;
    this.expenseService.getExpenseById(id).subscribe({
      next: (expense) => {
        if (expense) {
          this.expenseForm.patchValue({
            title: expense.title,
            amount: expense.amount,
            category: expense.category,
            description: expense.description || "",
            date: new Date(expense.date),
          });
        } else {
          this.showError("Expense not found");
          this.router.navigate(["/expenses"]);
        }
        this.isLoading = false;
      },
      error: () => {
        this.showError("Error loading expense");
        this.isLoading = false;
      },
    });
  }

  onSubmit(): void {
    if (this.expenseForm.valid) {
      this.isLoading = true;
      const formValue = this.expenseForm.value;

      const expense: Expense = {
        title: formValue.title.trim(),
        amount: +formValue.amount,
        category: formValue.category,
        description: formValue.description?.trim() || undefined,
        date: new Date(formValue.date),
      };

      if (this.isEditMode && this.expenseId) {
        expense.id = this.expenseId;
        this.updateExpense(expense);
      } else {
        this.addExpense(expense);
      }
    } else {
      this.markFormGroupTouched();
    }
  }

  addExpense(expense: Expense): void {
    this.expenseService.addExpense(expense).subscribe({
      next: () => {
        this.showSuccess("Expense added successfully!");
        this.router.navigate(["/expenses"]);
      },
      error: () => {
        this.showError("Error adding expense");
        this.isLoading = false;
      },
    });
  }

  updateExpense(expense: Expense): void {
    this.expenseService.updateExpense(expense).subscribe({
      next: () => {
        this.showSuccess("Expense updated successfully!");
        this.router.navigate(["/expenses"]);
      },
      error: () => {
        this.showError("Error updating expense");
        this.isLoading = false;
      },
    });
  }

  onCancel(): void {
    this.router.navigate(["/expenses"]);
  }

  onReset(): void {
    if (this.isEditMode && this.expenseId) {
      this.loadExpense(this.expenseId);
    } else {
      this.initializeForm();
    }
  }

  getFieldError(fieldName: string): string {
    const field = this.expenseForm.get(fieldName);
    if (field && field.touched && field.errors) {
      const errors = field.errors;

      if (errors["required"]) {
        return `${this.getFieldDisplayName(fieldName)} is required`;
      }
      if (errors["minlength"]) {
        return `${this.getFieldDisplayName(fieldName)} must be at least ${errors["minlength"].requiredLength} characters`;
      }
      if (errors["maxlength"]) {
        return `${this.getFieldDisplayName(fieldName)} cannot exceed ${errors["maxlength"].requiredLength} characters`;
      }
      if (errors["min"]) {
        return `${this.getFieldDisplayName(fieldName)} must be greater than ${errors["min"].min}`;
      }
      if (errors["max"]) {
        return `${this.getFieldDisplayName(fieldName)} cannot exceed ${errors["max"].max}`;
      }
    }
    return "";
  }

  getFieldDisplayName(fieldName: string): string {
    const displayNames: { [key: string]: string } = {
      title: "Title",
      amount: "Amount",
      category: "Category",
      description: "Description",
      date: "Date",
    };
    return displayNames[fieldName] || fieldName;
  }

  private markFormGroupTouched(): void {
    Object.keys(this.expenseForm.controls).forEach((key) => {
      const control = this.expenseForm.get(key);
      control?.markAsTouched();
    });
  }

  private showSuccess(message: string): void {
    this.snackBar.open(message, "Close", {
      duration: 3000,
      panelClass: ["success-snackbar"],
    });
  }

  private showError(message: string): void {
    this.snackBar.open(message, "Close", {
      duration: 5000,
      panelClass: ["error-snackbar"],
    });
  }

  get pageTitle(): string {
    return this.isEditMode ? "Edit Expense" : "Add New Expense";
  }

  get submitButtonText(): string {
    return this.isEditMode ? "Update Expense" : "Add Expense";
  }
}
