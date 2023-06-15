import { Component, OnInit } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
// import '../../../data/demo-user-data';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { GeneralService } from 'src/app/core/general.service';

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

  constructor(
    private generalS: GeneralService
  ) { }

  ngOnInit(): void {
    this.getAllUserData();
  }

  getAllUserData() {
    this.generalS.getAllUser().subscribe(res => {
      console.log(res);
      if (res.statusCode === 200) {
        this.dataSource = new MatTableDataSource<PeriodicElement>(res.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.generalS.showSuccess(res.message, 'Success');
      }
      else
        this.generalS.showError(res.message, 'Error');
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
    this.generalS.showSuccess('User Deleted Successfully', 'Success');
  }

  setUserId(userId: any) {
    console.log(userId);

    this.generalS.userID = userId
  }

}

