import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { GeneralService } from 'src/app/core/general.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogModel, DialogCompComponent } from 'src/app/components/dialog-comp/dialog-comp.component';
import { Router } from '@angular/router';


export interface PeriodicElement {
  title: string,
  status: number,
  createdAt: string,
  updatedAt: string,
  actions: string
}

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {
  displayedColumns: string[] = ['title', 'status', 'createdAt', 'updatedAt', 'actions'];
  dataSource: any;
  inputControl = new FormControl('');

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  resp: any;

  constructor(
    private generalS: GeneralService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllRoles();
  }

  getAllRoles() {
    this.generalS.getAllRole().subscribe({
      next: res => {
        if (!res.error) {
          this.dataSource = new MatTableDataSource<PeriodicElement>(res.data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.generalS.showSuccess(res.message, 'Success');
        }
        else
          this.generalS.showError(res.message, 'Error');
      },
      error: err => {
        this.generalS.showError(err.message, 'Error');
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
    // this.generalS.roleId = data.id;
    // this.router.navigate(['/role/edit']);
  }

  deleteRecord(data: any) {

    const message = `Are you sure you want to delete this?`;

    const dialogData = new ConfirmDialogModel("Confirm Action", message);

    const dialogRef = this.dialog.open(DialogCompComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.beforeClosed().subscribe((dialogResult: any) => {
      console.log(dialogResult)
      // this.resp = dialogResult;
      if (dialogResult) {
        this.generalS.deleteRole(data.id).subscribe({
          next: res => {
            if (!res.error) {
              this.generalS.showSuccess(res.message, 'Success');
              this.getAllRoles();
            } else {
              this.generalS.showError(res.message, 'Error');
            }
          },
          error: err => {
            this.generalS.showError(err, 'Error');
          }
        })
      }
    });

  }
}
