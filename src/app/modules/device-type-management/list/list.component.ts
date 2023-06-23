import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmDialogModel, DialogCompComponent } from 'src/app/components/dialog-comp/dialog-comp.component';
import { GeneralService } from 'src/app/core/general.service';

export interface DeviceType {
  hardwareType: string,
  createdAt: string,
  actions: string
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['hardwareType', 'createdAt', 'actions'];
  dataSource: any;
  inputControl = new FormControl('');

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  resp: any;

  constructor(
    private generalS: GeneralService,
    private router: Router,
    public dialog: MatDialog
  ) { }
  ngOnInit() {
    this.getAllDeviceType();
  }

  getAllDeviceType() {
    this.generalS.getAllDeviceType().subscribe({
      next: res => {
        if (!res.error) {
          this.dataSource = new MatTableDataSource<DeviceType>(res.data);
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
    })
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
    this.generalS.deviceTypeId = data.id;
    this.router.navigate(['/device-type/edit']);
  }

  deleteRecord(data: any) {

    const message = `Are you sure you want to delete this?`;

    const dialogData = new ConfirmDialogModel("Confirm Action", message);

    const dialogRef = this.dialog.open(DialogCompComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.resp = dialogResult;
      if (this.resp) {
        // this.generalS.showSuccess('Device Type Deleted Successfully', 'Success');
        this.generalS.deleteDeviceType(data.id).subscribe(
          {
            next: res => {
              if (!res.error) {
                this.generalS.showSuccess(res.message, 'Success');
                this.getAllDeviceType();
              } else {
                this.generalS.showError(res.message, 'Error');
              }
            },
            error: err => {
              this.generalS.showError(err.message, 'Error');
            }
          })
      }
    });

  }


}
