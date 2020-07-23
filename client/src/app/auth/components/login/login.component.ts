import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private formBuilder: FormBuilder) {}

  loginForm = this.formBuilder.group({
    email: '',
    password: '',
  });

  ngOnInit(): void {}

  login(): void {
    console.log(this.loginForm.value);
    localStorage.setItem('userId', 'Notnull');
    localStorage.setItem('isAdmin', 'Notnull');
    this.router.navigate(['admin']);
  }
}
