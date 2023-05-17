import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  isSidebarVisible: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(
    private toastr: ToastrService
  ) { }

  showSuccess(message: string, title?: string) {
    this.toastr.success(message, title);
  }
  showError(message: string, title: string) {
    this.toastr.error(message, title);
  }

}
