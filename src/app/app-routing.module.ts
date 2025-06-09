import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./components/auth/login/login.component";
import { RegisterComponent } from "./components/auth/register/register.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { ExpenseListComponent } from "./components/expense-list/expense-list.component";
import { AddExpenseComponent } from "./components/add-expense/add-expense.component";
import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
  { path: "", redirectTo: "/dashboard", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { 
    path: "dashboard", 
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: "expenses", 
    component: ExpenseListComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: "add-expense", 
    component: AddExpenseComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: "edit-expense/:id", 
    component: AddExpenseComponent,
    canActivate: [AuthGuard]
  },
  { path: "**", redirectTo: "/dashboard" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}


