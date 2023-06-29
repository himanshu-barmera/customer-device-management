import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { GeneralService } from 'src/app/core/general.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogModel, DialogCompComponent } from 'src/app/components/dialog-comp/dialog-comp.component';
import { ConfirmDialogModel1, EnterpasswordconfirmboxComponent } from 'src/app/components/enterpasswordconfirmbox/enterpasswordconfirmbox.component';

export interface PeriodicElement {
  devId: string,
  deviceName: string,
  deviceType: string,
  createdAt: string,
  updatedAt: string,
  actions: string
}

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit {

  displayedColumns: string[] = ['devId', 'deviceName', 'deviceType', 'createdAt', 'updatedAt', 'actions'];
  dataSource: any;
  inputControl = new FormControl('');

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  resp: any;
  resp1: any

  constructor(
    private generalS: GeneralService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getAllDevice();
  }

  getAllDevice() {
    this.generalS.getAllDevice().subscribe({
      next: res => {
        console.log(res)
        if (!res.error) {
          this.dataSource = new MatTableDataSource<PeriodicElement>(res.data.totalDevices.devices);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.generalS.showSuccess(res.message, 'Success');
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editRecord(data: any) {
    console.log(data);
  }

  deleteRecord(data: any) {
    const message = `Are you sure you want to delete this?`;
    const dialogData = new ConfirmDialogModel("Confirm Action", message);
    const dialogRef = this.dialog.open(DialogCompComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe((dialogResult: any) => {
      // console.log('this.resp')
      // console.log(this.resp)
      this.resp = dialogResult;
      if (this.resp) {

        let message1 = `Please Enter Logged-in User's Password to Confirm Delete.`;
        let dialogData1 = new ConfirmDialogModel1("Confirm Action", message1);
        let dialogRef1 = this.dialog.open(EnterpasswordconfirmboxComponent, {
          maxWidth: "400px",
          data: dialogData1
        });

        dialogRef1.afterClosed().subscribe((dialogResult1: any) => {
          this.resp1 = dialogResult1;

          // console.log('this.resp1')
          // console.log(this.resp1)

          // {password: '12345678', action: true}

          if (this.resp1.action) {
            this.generalS.deleteDevice(data.id, this.resp1.password).subscribe({
              next: res => {
                if (!res.error) {
                  this.generalS.showSuccess(res.message, 'Success');
                  this.getAllDevice();
                } else {
                  this.generalS.showError(res.message, 'Error');
                }
              },
              error: err => {
                this.generalS.showError(err, 'Error');
              }
            })
          }

        })

      }
    });

  }

}
