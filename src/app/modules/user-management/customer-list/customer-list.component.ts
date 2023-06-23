import { Component, OnInit } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
// import '../../../data/demo-user-data';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { GeneralService } from 'src/app/core/general.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogModel, DialogCompComponent } from 'src/app/components/dialog-comp/dialog-comp.component';

export interface PeriodicElement {
  // id: number,
  firstName: string,
  lastName: string,
  email: number,
  role: string,
  phoneNumber: number,
  userName: string,
  createdAt: string,
  actions: string
}

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'role', 'phoneNumber', 'userName', 'createdAt', 'actions'];
  dataSource: any;
  inputControl = new FormControl('');

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  resp: any

  constructor(
    private generalS: GeneralService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getAllUserData();
  }

  getAllUserData() {
    this.generalS.getAllUser().subscribe({
      next: res => {
        console.log(res);
        if (res.statusCode === 200) {
          this.dataSource = new MatTableDataSource<PeriodicElement>(res.data);
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
    // this.generalS.showSuccess('User Deleted Successfully', 'Success');

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

  setUserId(userId: any) {
    console.log(userId);

    this.generalS.userID = userId
  }

}

