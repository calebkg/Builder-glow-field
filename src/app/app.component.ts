import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "Expense Manager";

  menuItems = [
    { path: "/dashboard", icon: "dashboard", label: "Dashboard" },
    { path: "/expenses", icon: "list", label: "Expense List" },
    { path: "/add-expense", icon: "add", label: "Add Expense" },
  ];
}
