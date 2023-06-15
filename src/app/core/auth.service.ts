import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, map } from "rxjs";
import { environment } from "src/environments/environment";

export interface User {
  // id?: number;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  token?: string
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
    private router: Router
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
      console.log('user in auth service')
      console.log(user)
      if (user && user.token) {
        localStorage.setItem('e-c-user', JSON.stringify(user));
        this.userSubject.next(user);
        this.isUserLoggedIn.next(true);
        return user;
      }
    }
    ))
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('e-c-user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

}
