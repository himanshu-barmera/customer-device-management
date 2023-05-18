import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  isSidebarVisible: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(
    private toastr: ToastrService,
    private http: HttpClient
  ) { }

  showSuccess(message: string, title?: string) {
    this.toastr.success(message, title);
  }
  showError(message: string, title: string) {
    this.toastr.error(message, title);
  }

  getAllUser(): Observable<any> {
    return this.http.get('../../assets/data/user-data.json');
  }

  getAllRole(): Observable<any> {
    return this.http.get('../../assets/data/role-data.json');
  }

  getAllDevice(): Observable<any> {
    return this.http.get('../../assets/data/device-data.json');
  }

}
