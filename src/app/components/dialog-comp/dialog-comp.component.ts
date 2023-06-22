import { CommonModule, NgForOf } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgMaterialModule } from 'src/app/ng-material.module';

@Component({
  selector: 'app-dialog-comp',
  templateUrl: './dialog-comp.component.html',
  styleUrls: ['./dialog-comp.component.css'],
  standalone: true,
  imports: [CommonModule, NgMaterialModule]
})
export class DialogCompComponent {
  // @Input() deviceList!: [];
  data: any
  title!: string
  message!: string
  isArray: boolean = false

  constructor(
    private dialogRef: MatDialogRef<DialogCompComponent>,
    @Inject(MAT_DIALOG_DATA) public _data: any
  ) {
    // this.data = this._data
    // console.log(Array.isArray(this._data))
    // console.log(this._data)

    if (!(Array.isArray(this._data))) {
      this.title = _data.title;
      this.message = _data.message;
      this.isArray = false
    } else {
      this.data = this._data
      this.title = 'Device List';
      this.isArray = true
    }

  }

  close() {
    this.dialogRef.close(false);
  }

  ok() {
    // this.dialogRef.close('data is sending back to parent comp');
    this.dialogRef.close(true);
  }
}


export class ConfirmDialogModel {
  constructor(public title: string, public message: string) { }
}
