import { Component } from '@angular/core';
import { GeneralService } from 'src/app/core/general.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  deviceCnt: number = 0
  userCnt: number = 0;
  unassignedDeviceCnt: number = 0;
  assginedDeviceCnt: number = 0;

  constructor(
    private generalS: GeneralService
  ) {
    this.getAllDevice();
    this.getAllUsers();
  }

  getAllDevice() {
    this.generalS.getAllDevice().subscribe({
      next: res => {
        console.log(res)
        if (!res.error) {
          this.generalS.showSuccess(res.message, 'Success');
          this.deviceCnt = res.data.totalDevices.devices.length;
        }
        else
          this.generalS.showError(res.message, 'Error');
      },
      error: err => {
        this.generalS.showError(err, 'Error');
      }
    }
    )
  }

  getAllUsers() {
    this.generalS.userCount().subscribe({
      next: res => {
        console.log(res)
        if (!res.error) {
          this.userCnt = res.data.userCounts.totalUsers
          this.generalS.showSuccess(res.message, 'Success');
        }
        else
          this.generalS.showError(res.message, 'Error');
      },
      error: err => {
        this.generalS.showError(err, 'Error');
      }
    })
  }
}
