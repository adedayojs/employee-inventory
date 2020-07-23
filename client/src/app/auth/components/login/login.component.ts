import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  login(): void {
    console.log('Login');
    localStorage.setItem('userId', 'Notnull');
    localStorage.setItem('isAdmin', 'Notnull');
    this.router.navigate(['admin']);
  }
}
