import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { User, LoginCredentials, LoginResponse } from '../models';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();
  private readonly API_URL = '/api/auth';

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {
    this.checkAuthStatus();
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  login(credentials: LoginCredentials): Observable<User> {
    // For demo purposes, using mock data
    return of({
      token: 'mock_jwt_token',
      user: {
        id: '1',
        email: credentials.email,
        username: credentials.email.split('@')[0],
        subscription: 'free',
        role: 'admin', // For testing admin features
        createdAt: new Date()
      }
    } as LoginResponse).pipe(
      tap(response => {
        this.tokenService.setToken(response.token);
        this.currentUserSubject.next(response.user);
      }),
      map(response => response.user),
      catchError(error => throwError(() => new Error('Login failed')))
    );
  }

  logout(): void {
    this.tokenService.removeToken();
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return this.tokenService.isTokenValid();
  }

  private checkAuthStatus(): void {
    if (this.isAuthenticated()) {
      const mockUser: User = {
        id: '1',
        email: 'admin@example.com',
        username: 'admin',
        subscription: 'free',
        role: 'admin',
        createdAt: new Date()
      };
      this.currentUserSubject.next(mockUser);
    }
  }
}