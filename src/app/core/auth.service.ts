// import { HttpClient } from "@angular/common/http";
// import { Injectable } from "@angular/core";
// import { BehaviorSubject, Observable, map } from "rxjs";
// import { observableToBeFn } from "rxjs/internal/testing/TestScheduler";

// export interface User {
//   // id?: number;
//   email: string;
//   password: string;
//   firstName?: string;
//   lastName?: string;
//   token?: string
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   isUserLoggedIn: BehaviorSubject<boolean>;
//   private userSubject: BehaviorSubject<User | null>
//   public user: Observable<User | null>

//   constructor(
//     private http: HttpClient
//   ) {
//     this.isUserLoggedIn = new BehaviorSubject<boolean>(false);
//     this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('e-c-user') || 'null') || null);
//     this.user = this.userSubject.asObservable();
//   }

//   public get userValue() {
//     return this.userSubject.value;
//   }

//   login(userData: any) {
//     return this.http.post('', { userData }).pipe(map((user: any) => {

//       if (user && user.token) {
//         localStorage.setItem('e-c-user', JSON.stringify(user));
//         this.userSubject.next(user);
//         this.isUserLoggedIn.next(true);
//       }
//     }
//     ))
//   }

// }
