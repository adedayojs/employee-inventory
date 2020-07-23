import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  signUpForm = this.formBuilder.group({
    email: [
      '',
      [Validators.email, Validators.required, Validators.minLength(3)],
    ],
    password: ['', [Validators.required, Validators.minLength(3)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(3)]],
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', [Validators.required, Validators.minLength(3)]],
    userName: ['', [Validators.required, Validators.minLength(3)]],
  });
  error = '';
  formError = false;

  ngOnInit(): void {}
  signUp(): void {
    console.log('signup');
    if (
      this.signUpForm.value.password !== this.signUpForm.value.confirmPassword
    ) {
      this.error = 'Password and confirm pasword does not match';
      this.formError = true;
      setTimeout(() => {
        this.formError = false;
      }, 1500);
      return;
    }

    if (!this.signUpForm.valid) {
      this.error = 'Please Complete form';
      this.formError = true;
      setTimeout(() => {
        this.formError = false;
      }, 1500);
      return;
    }
    this.http.post('/api/v1/users/signup', this.signUpForm.value).subscribe(
      (res) => {
        console.log(res);
        alert('Signup Successful');
        this.router.navigateByUrl('/auth/login');
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
