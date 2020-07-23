import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  
  isLoggednIn(): boolean {
    let loggedIn = false;
    loggedIn = localStorage.getItem('userId') !== null;
    return loggedIn;
  }

  // tslint:disable-next-line: typedef
  login() {}

  // tslint:disable-next-line: typedef
  signup() {}

  // tslint:disable-next-line: typedef
  logout() {}

  // tslint:disable-next-line: typedef
  verifyEmail() {}

  // tslint:disable-next-line: typedef
  resetPassword() {}
}
