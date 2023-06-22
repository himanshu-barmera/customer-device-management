import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { GeneralService } from 'src/app/core/general.service';

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

  constructor(
    private generalS: GeneralService
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
    this.generalS.showSuccess('Device Deleted Successfully', 'Success');
  }

}
