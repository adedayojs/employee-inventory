import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {}

  loginForm = this.formBuilder.group({
    email: '',
    password: '',
  });

  error = '';
  formError = false;

  ngOnInit(): void {}

  login(): void {
    console.log(this.loginForm.value);
    this.http.post<any>('/api/v1/users/login', this.loginForm.value).subscribe(
      (res) => {
        console.log(res);
        alert('Login Successful');
        localStorage.setItem('userId', res.id);
        const admin = res.admin
          ? localStorage.setItem('isAdmin', 'true')
          : null;
        this.router.navigate(['/admin']);
      },
      (err) => {
        console.log(err);
        this.error = err.error.message;
        this.formError = true;
        setTimeout(() => {
          this.formError = false;
        }, 3000);
        return;
      }
    );
  }
}
