import { UserModel } from './../../../models/user';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  constructor(private http: HttpClient) {}
  allUsers: Array<UserModel>;
  filterdUsers: Array<UserModel>;
  searchTerm = '';
  pricePerMinute = 0.02;
  resumption;
  ngOnInit(): void {
    this.fetchAllUsers();
    this.fetchResumption();
  }
  fetchAllUsers(): void {
    this.http.get<Array<UserModel>>('api/v1/users').subscribe(
      (res) => {
        console.log(res);
        this.allUsers = res;
        this.sortLowest();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  fetchResumption(): void {
    this.http.get<any>('api/v1/resumption').subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  reducer = (accumulator, currentValue) => accumulator + currentValue.lateTime;
  sortHighest(): void {
    this.allUsers.sort((a, b) => {
      a.owed = a.login.reduce(this.reducer, 0);
      b.owed = b.login.reduce(this.reducer, 0);
      return b.owed - a.owed;
    });
  }
  sortLowest(): void {
    this.allUsers.sort((a, b) => {
      a.owed = a.login.reduce(this.reducer, 0);
      b.owed = b.login.reduce(this.reducer, 0);
      return a.owed - b.owed;
    });
  }
  search(value?) {
    console.log(value, this.searchTerm);
  }
}
