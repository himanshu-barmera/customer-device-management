import { Component } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import items from 'src/app/data/demo-table-data';

export interface PeriodicElement {
  id: number,
  firstName: string,
  lastName: string,
  age: number,
  company: string
}

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'age', 'company'];
  dataSource = new MatTableDataSource<PeriodicElement>(items);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

