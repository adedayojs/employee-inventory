import { UserModel } from './../../../models/user';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router) {}
  allUsers: Array<UserModel>;
  filterdUsers: Array<UserModel>;
  searchTerm = '';
  pricePerMinute = 0.02;
  resumption;
  sortType: 'Sort By Highest' | 'Sort By Lowest' = 'Sort By Lowest';

  //  State Would be used to store loggedin user details
  loggedInUser; // Get from state
  ngOnInit(): void {
    this.fetchAllUsers();
    this.fetchResumption();
  }
  fetchAllUsers(): void {
    this.http.get<Array<UserModel>>('api/v1/users').subscribe(
      (res) => {
        console.log(res);
        this.allUsers = res;
        //  Filter Users
        this.search();

        //  Sort them users
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
    this.filterdUsers.sort((a, b) => {
      a.owed = a.login.reduce(this.reducer, 0);
      b.owed = b.login.reduce(this.reducer, 0);
      return b.owed - a.owed;
    });
  }
  sortLowest(): void {
    this.filterdUsers.sort((a, b) => {
      a.owed = a.login.reduce(this.reducer, 0);
      b.owed = b.login.reduce(this.reducer, 0);
      return a.owed - b.owed;
    });
  }

  //  Filter method
  search(value?): void {
    console.log(value, this.searchTerm);
    value = value || this.searchTerm;
    this.filterdUsers = this.allUsers.filter(
      (user) =>
        new RegExp(value, 'i').exec(user.firstName) ||
        new RegExp(value, 'i').exec(user.email) ||
        new RegExp(value, 'i').exec(user.userName) ||
        new RegExp(value, 'i').exec(user.lastName)
    );
  }

  logout(): void {
    localStorage.clear();
    this.router.navigateByUrl('auth/login');
  }

  sort(val): void {
    if (val === 'Sort By Highest') {
      this.sortType = 'Sort By Highest';
      this.sortHighest();
    } else {
      this.sortType = 'Sort By Lowest';
      this.sortLowest();
    }
  }
}
