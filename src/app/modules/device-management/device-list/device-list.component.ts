import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import deviceData from 'src/app/data/demo-device-data';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { GeneralService } from 'src/app/core/general.service';

export interface PeriodicElement {
  id: number,
  devId: string,
  deviceName: string,
  cellType: number,
  numberOfCell: number,
  actions: string
}
@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent {

  displayedColumns: string[] = ['id', 'devId', 'deviceName', 'cellType', 'numberOfCell', 'actions'];
  dataSource: any = new MatTableDataSource<PeriodicElement>(deviceData);
  inputControl = new FormControl('');

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private generalS: GeneralService
  ) { }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
    console.log(data);
    this.generalS.showSuccess('Device Deleted Successfully', 'Success');
  }

}
