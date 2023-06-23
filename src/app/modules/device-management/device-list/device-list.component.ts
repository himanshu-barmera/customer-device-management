import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { GeneralService } from 'src/app/core/general.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogModel, DialogCompComponent } from 'src/app/components/dialog-comp/dialog-comp.component';

export interface PeriodicElement {
  devId: string,
  deviceName: string,
  deviceType: string,
  createdAt: string,
  lastCommissioned: string,
  actions: string
}

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['devId', 'deviceName', 'deviceType', 'createdAt', 'lastCommissioned', 'actions'];
  dataSource: any;
  inputControl = new FormControl('');

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  resp: any;

  constructor(
    private generalS: GeneralService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.generalS.getAllDevice().subscribe(res => {
      if (res.statusCode === 200) {
        this.dataSource = new MatTableDataSource<PeriodicElement>(res.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.generalS.showSuccess(res.message, 'Success');
      }
      else
        this.generalS.showError(res.message, 'Error');
    },
    )
  }

  ngAfterViewInit() { }

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
    console.log(data);
    // this.generalS.showSuccess('Device Deleted Successfully', 'Success');

    const message = `Are you sure you want to delete this?`;

    const dialogData = new ConfirmDialogModel("Confirm Action", message);

    const dialogRef = this.dialog.open(DialogCompComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe((dialogResult: any) => {
      this.resp = dialogResult;
      if (this.resp) {
        // this.generalS.deleteRole(data.id).subscribe(
        //   {
        //     next: res => {
        //       if (!res.error) {
        //         this.generalS.showSuccess(res.message, 'Success');
        //         this.getAllRoles();
        //       } else {
        //         this.generalS.showError(res.message, 'Error');
        //       }
        //     },
        //     error: err => {
        //       this.generalS.showError(err.message, 'Error');
        //     }
        //   })
      }
    });

  }

}
