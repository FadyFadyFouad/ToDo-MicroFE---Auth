import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly APIKey: string = 'AIzaSyCOWRkRWKo9QI2eUZgwjhwamXWZKoHppyg';
  private readonly authDomain: string = 'sumerge-task-4.firebaseapp.com';
  private readonly projectId: string = 'sumerge-task-4';
  private readonly storageBucket: string = 'sumerge-task-4.firebasestorage.app';
  private readonly messagingSenderId: string = '30108670530';
  private readonly appId: string = '1:30108670530:web:a89165fca9ca332de26bdb';
  private http!: HttpClient;
  private readonly BASE_URL: string =
    'https://identitytoolkit.googleapis.com/v1/accounts:';
  private readonly SignUp: string = `signUp?key=${this.APIKey}`;
  private readonly SignIn: string = `signInWithPassword?key=${this.APIKey}`;

  tasks: { title: string; priority: number; completed: boolean }[] = [];

  constructor() {
    this.http = inject(HttpClient);
  }

  signUp(email: string, password: string) {
    return this.http.post(this.BASE_URL + this.SignUp, {
      email: email,
      password: password,
      returnSecureToken: true,
    });
  }

  signIn(email: string, password: string) {
    return this.http.post<any>(this.BASE_URL + this.SignIn, {
      email: email,
      password: password,
      returnSecureToken: true,
    });
  }
}
