import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  isSidebarVisible: BehaviorSubject<boolean> = new BehaviorSubject(false);

  userID: any;
  deviceId: any;
  deviceTypeId: any;
  roleId: any;

  constructor(
    private toastr: ToastrService,
    private http: HttpClient
  ) { }

  showSuccess(message: string, title?: string) {
    this.toastr.success(message, title);
  }
  showError(message: string, title?: string) {
    this.toastr.error(message, title);
  }

  getAllUser(): Observable<any> {
    // return this.http.get('../../assets/data/user-data.json');
    return this.http.get(`${environment.baseURL}/sys/manage/users`);
  }

  addNewUser(userData: any): Observable<any> {
    return this.http.post(`${environment.baseURL}/users`, userData);
  }


  getAllRole(): Observable<any> {
    // return this.http.get('../../assets/data/role-data.json');
    return this.http.get(`${environment.baseURL}/sys/manage/roles`);
  }


  getAllDevice(): Observable<any> {
    return this.http.get('../../assets/data/device-data.json');
  }



  getUserDeviceList(userId: any): Observable<any> {
    return this.http.get('../../assets/data/user-device-data.json');
  }

  unAssignedDevices(userId: any): Observable<any> {
    return this.http.get('../../assets/data/unassigned-device-data.json');
  }

  getAllDeviceType(): Observable<any> {
    return this.http.get(`${environment.baseURL}/sys/hw_type`);
  }

  addDeviceType(deviceTypeData: any): Observable<any> {
    return this.http.post(`${environment.baseURL}/sys/hw_type`, deviceTypeData);
  }

  getDeviceTypeById(deviceTypeId: string): Observable<any> {
    return this.http.get(`${environment.baseURL}/sys/hw_type/${deviceTypeId}`);
  }

  deleteDeviceType(deviceTypeId: string): Observable<any> {
    return this.http.delete(`${environment.baseURL}/sys/hw_type/${deviceTypeId}`);
  }

  addRole(roleData: any): Observable<any> {
    return this.http.post(`${environment.baseURL}/sys/manage/roles`, roleData);
  }

  getRoleById(roleId: number): Observable<any> {
    return this.http.get(`${environment.baseURL}/sys/manage/roles/${roleId}`);
    // return this.http.get('../../assets/data/single-role-data.json');
  }

  addDevice(deviceData: any): Observable<any> {
    return this.http.post(`${environment.baseURL}/sys/manage/devices`, deviceData);
  }







}
