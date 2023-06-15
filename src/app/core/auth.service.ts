import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, map } from "rxjs";
import { environment } from "src/environments/environment";
import { GeneralService } from "./general.service";

export interface User {
  // id?: number;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  accessToken?: string
  refreshToken?: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isUserLoggedIn: BehaviorSubject<boolean>;
  private userSubject: BehaviorSubject<User | null>
  public user: Observable<User | null>

  constructor(
    private http: HttpClient,
    private router: Router,
    private generalS: GeneralService
  ) {
    this.isUserLoggedIn = new BehaviorSubject<boolean>(false);
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('e-c-user') || 'null') || null);
    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }

  login(userName: any, password: any) {
    return this.http.post(`${environment.baseURL}/users/login`, { userName, password }).pipe(map((user: any) => {
      if (user && user.data.accessToken) {
        localStorage.setItem('e-c-user', JSON.stringify(user.data));
        this.userSubject.next(user.data);
        this.isUserLoggedIn.next(true);
        return user.data;
      }
    }
    ))
  }

  logout() {
    // remove user from local storage and set current user to null
    this.http.get(`${environment.baseURL}/users/logout`, {}).subscribe({
      next: (res: any) => {
        console.log(res);
        this.isUserLoggedIn.next(false);
        localStorage.clear();
        this.generalS.showSuccess("Logged Out Successfully!");
        this.userSubject.next(null);
        this.router.navigate(['/login']);
        return res;
      },
      error: (err: any) => {
        this.generalS.showError("Logged Out Error : " + err.message);
      }
    })
  }
}
