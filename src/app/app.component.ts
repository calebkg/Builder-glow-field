import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  template: `
    <ng-container *ngIf="authService.isAuthenticated(); else authTemplate">
      <mat-toolbar color="primary">
        <button mat-icon-button (click)="sidenav.toggle()">
          <mat-icon>menu</mat-icon>
        </button>
        <span>Expense Manager</span>
        <span class="spacer"></span>
        <button mat-icon-button [matMenuTriggerFor]="userMenu">
          <mat-icon>account_circle</mat-icon>
        </button>
        <mat-menu #userMenu="matMenu">
          <button mat-menu-item (click)="onLogout()">
            <mat-icon>exit_to_app</mat-icon>
            <span>Logout</span>
          </button>
        </mat-menu>
      </mat-toolbar>

      <mat-sidenav-container>
        <mat-sidenav #sidenav mode="side" opened>
          <mat-nav-list>
            <a mat-list-item routerLink="/dashboard" routerLinkActive="active-link">
              <mat-icon>dashboard</mat-icon>
              <span>Dashboard</span>
            </a>
            <a mat-list-item routerLink="/expenses" routerLinkActive="active-link">
              <mat-icon>list</mat-icon>
              <span>Expenses</span>
            </a>
            <a mat-list-item routerLink="/add-expense" routerLinkActive="active-link">
              <mat-icon>add</mat-icon>
              <span>Add Expense</span>
            </a>
          </mat-nav-list>
        </mat-sidenav>

        <mat-sidenav-content>
          <div class="content">
            <router-outlet></router-outlet>
          </div>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </ng-container>

    <ng-template #authTemplate>
      <router-outlet></router-outlet>
    </ng-template>
  `,
  styles: [`
    .spacer {
      flex: 1 1 auto;
    }

    mat-sidenav-container {
      height: calc(100vh - 64px);
    }

    mat-sidenav {
      width: 250px;
      background: #fafafa;
    }

    .content {
      padding: 20px;
    }

    mat-nav-list {
      padding-top: 20px;
    }

    mat-nav-list a {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 20px;
    }

    .active-link {
      background: #e3f2fd;
      color: #1976d2;
    }
  `]
})
export class AppComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Redirect to login if not authenticated
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }

  onLogout(): void {
    this.authService.logout();
  }
}
