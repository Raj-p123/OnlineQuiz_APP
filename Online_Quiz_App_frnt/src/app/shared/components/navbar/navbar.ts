import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  userRole: string | null = null;
  menuActive = false;
  private authSubscription: Subscription = new Subscription();

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.updateAuthState();
    this.authSubscription = this.authService.isAuthenticated$.subscribe(() => {
      this.updateAuthState();
    });
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  private updateAuthState() {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      this.isLoggedIn = this.authService.isLoggedIn();
      this.userRole = localStorage.getItem('role');
    }
  }

  toggleMenu() {
    this.menuActive = !this.menuActive;
  }

  closeMenu() {
    this.menuActive = false;
  }

  logout() {
    this.authService.logout();
    this.updateAuthState();
    if (typeof window !== 'undefined') {
      window.location.reload(); // Simple way to refresh and navigate to login
    }
  }
}

