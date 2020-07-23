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
        this.resumption = new Date();
        this.resumption.setHours(8);
        this.resumption.setMinutes(0);
        this.resumption.setMilliseconds(0);
        console.log(this.resumption);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  latenessFilter(): void {}
}
