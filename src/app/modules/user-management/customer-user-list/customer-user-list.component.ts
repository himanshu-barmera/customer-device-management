import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GeneralService } from 'src/app/core/general.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogCompComponent } from 'src/app/components/dialog-comp/dialog-comp.component';

export interface AssignedDevice {
  // id: number,
  firstName: string,
  lastName: string,
  deviceName: string,
  deviceId: number,
}

export interface UnAssignedDevice {
  // id: number,
  // firstName: string,
  // lastName: string,
  deviceName: string,
  deviceId: number,
}


@Component({
  selector: 'app-customer-user-list',
  templateUrl: './customer-user-list.component.html',
  styleUrls: ['./customer-user-list.component.css']
})
export class CustomerUserListComponent implements OnInit {

  displayedColumnsAssigned: string[] = ['firstName', 'lastName', 'deviceName'];
  displayedColumnsUnAssigned: string[] = ['deviceName'];
  dataSource: any;
  deviceData: any;
  inputControl = new FormControl('');
  inputControl1 = new FormControl('');

  @ViewChild('assignedPaginator') assignedPaginator!: MatPaginator;
  @ViewChild('unAssignedPaginator') unAssignedPaginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private generalS: GeneralService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    console.log(this.generalS.userID);

    this.getUserDeviceList(this.generalS.userID);
    this.unAssignedDevices(this.generalS.userID)
  }

  getUserDeviceList(userId: any) {

    this.generalS.getUserDeviceList(userId).subscribe((res: any) => {
      // console.log('response1')
      // console.log(res)

      if (res.statusCode === 200) {
        this.dataSource = new MatTableDataSource<AssignedDevice>(res.data);
        this.dataSource.paginator = this.assignedPaginator;
        this.dataSource.sort = this.sort;
        this.generalS.showSuccess(res.message, 'Success');
      }
      else
        this.generalS.showError(res.message, 'Error');

    })

  }

  unAssignedDevices(userId: any) {
    this.generalS.unAssignedDevices(userId).subscribe((res: any) => {
      console.log('response2')
      console.log(res)

      if (res.statusCode === 200) {
        this.deviceData = new MatTableDataSource<UnAssignedDevice>(res.data);
        this.deviceData.paginator = this.unAssignedPaginator;
        this.deviceData.sort = this.sort;
        this.generalS.showSuccess(res.message, 'Success');
      }
      else
        this.generalS.showError(res.message, 'Error');
    })
  }

  applyFilterForAssignedDevices(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilterForUnAssignedDevices(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.deviceData.filter = filterValue.trim().toLowerCase();

    if (this.deviceData.paginator) {
      this.deviceData.paginator.firstPage();
    }
  }

  showDialog(deviceName: []) {

    const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = deviceName;

    this.dialog.open(DialogCompComponent, dialogConfig);

    // const dialogRef = this.dialog.open(DialogCompComponent, dialogConfig);

    // dialogRef.afterClosed().subscribe(
    //   data => console.log("Dialog output:", data)
    // );
  }


}
