export interface UserModel {
  login: Array<LoginModel>;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  owed?: any;
}

export interface LoginModel {
  timeOfArrival: string;
  isLate: boolean;
  lateTime: number;
  resumption: string;
}
