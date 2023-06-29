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

  /****************** USER'S API *******************/

  getAllUser(): Observable<any> {
    // return this.http.get('../../assets/data/user-data.json');
    return this.http.get(`${environment.baseURL}/sys/manage/users`);
  }

  addNewUser(userData: any): Observable<any> {
    return this.http.post(`${environment.baseURL}/users`, userData);
  }

  deleteUser(userId: any): Observable<any> {
    return this.http.delete(`${environment.baseURL}/sys/manage/users/${userId}`);
  }

  getUserDataById(userId: any): Observable<any> {
    return this.http.get(`${environment.baseURL}/sys/manage/users/${userId}`);
  }

  updateUser(userData: any): Observable<any> {
    return this.http.patch(`${environment.baseURL}/sys/manage/users/${userData.id}`, userData);
  }

  /****************** ROLE API *******************/

  getAllRole(): Observable<any> {
    // return this.http.get('../../assets/data/role-data.json');
    return this.http.get(`${environment.baseURL}/sys/manage/roles`);
  }

  addRole(roleData: any): Observable<any> {
    return this.http.post(`${environment.baseURL}/sys/manage/roles`, roleData);
  }

  getRoleById(roleId: number): Observable<any> {
    return this.http.get(`${environment.baseURL}/sys/manage/roles/${roleId}`);
    // return this.http.get('../../assets/data/single-role-data.json');
  }

  deleteRole(roleId: string): Observable<any> {
    return this.http.delete(`${environment.baseURL}/sys/manage/roles/${roleId}`);
  }


  /****************** DEVICE API *******************/

  getAllDevice(): Observable<any> {
    // return this.http.get('../../assets/data/device-data.json');
    return this.http.get(`${environment.baseURL}/dashboard/devices?type=totalDevice`);
  }

  addDevice(deviceData: any): Observable<any> {
    return this.http.post(`${environment.baseURL}/sys/device`, deviceData);
  }

  getDeviceById(deviceId: string): Observable<any> {
    return this.http.get(`${environment.baseURL}/sys/device/${deviceId}`);
  }

  updateDevice(deviceData: any): Observable<any> {
    return this.http.put(`${environment.baseURL}/sys/device`, deviceData);
  }

  deleteDevice(deviceId: string, pass: string): Observable<any> {
    let tmpObj = {
      "password": pass
    }
    return this.http.put(`${environment.baseURL}/sys/device/${deviceId}`, tmpObj);
  }


  getUserDeviceList(userId: any): Observable<any> {
    return this.http.get('../../assets/data/user-device-data.json');
  }

  unAssignedDevices(userId: any): Observable<any> {
    return this.http.get('../../assets/data/unassigned-device-data.json');
  }



  /****************** DEVICE TYPE API *******************/

  getAllDeviceType(): Observable<any> {
    return this.http.get(`${environment.baseURL}/sys/hw_type`);
  }

  addDeviceType(deviceTypeData: any): Observable<any> {
    return this.http.post(`${environment.baseURL}/sys/hw_type`, deviceTypeData);
  }

  updateDeviceType(deviceTypeData: any): Observable<any> {
    return this.http.put(`${environment.baseURL}/sys/hw_type/${deviceTypeData.id}`, { "hardwareType": deviceTypeData.hardwareType });
  }

  getDeviceTypeById(deviceTypeId: string): Observable<any> {
    return this.http.get(`${environment.baseURL}/sys/hw_type/${deviceTypeId}`);
  }

  deleteDeviceType(deviceTypeId: string): Observable<any> {
    return this.http.delete(`${environment.baseURL}/sys/hw_type/${deviceTypeId}`);
  }












}
