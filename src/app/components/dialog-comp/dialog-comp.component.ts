import { CommonModule, NgForOf } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-comp',
  templateUrl: './dialog-comp.component.html',
  styleUrls: ['./dialog-comp.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class DialogCompComponent {
  // @Input() deviceList!: [];
  data: any
  constructor(
    private dialogRef: MatDialogRef<DialogCompComponent>,
    @Inject(MAT_DIALOG_DATA) public _data: any
  ) {
    this.data = this._data
  }

  // close() {
  //   this.dialogRef.close();
  // }

  // save() {
  //   this.dialogRef.close('data is sending back to parent comp');
  // }
}
