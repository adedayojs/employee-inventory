import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  signUpForm = this.formBuilder.group({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    userName: '',
  });

  ngOnInit(): void {}
  signUp(): void {
    console.log('signup');
  }
}
