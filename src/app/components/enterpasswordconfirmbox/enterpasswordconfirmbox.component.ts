import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgMaterialModule } from 'src/app/ng-material.module';

@Component({
  selector: 'app-enterpasswordconfirmbox',
  templateUrl: './enterpasswordconfirmbox.component.html',
  standalone: true,
  imports: [CommonModule, NgMaterialModule, ReactiveFormsModule],
  styles: [
    `.example-form {
      min-width: 150px;
      max-width: 500px;
      width: 100%;
    }

    .example-full-width {
      width: 100%;
    }`
  ]
  // styleUrls: ['./enterpasswordconfirmbox.component.css']
})
export class EnterpasswordconfirmboxComponent {
  data: any
  title!: string
  message!: string
  // isArray: boolean = false
  deleteConfirmForm: FormGroup = new FormGroup({})

  constructor(
    private dialogRef: MatDialogRef<EnterpasswordconfirmboxComponent>,
    @Inject(MAT_DIALOG_DATA) public _data: any,
    private fb: FormBuilder
  ) {
    this.data = this._data
    console.log(this._data)

    this.title = this._data.title;
    this.message = this._data.message;

    this.createForm();
  }

  createForm() {

    this.deleteConfirmForm = this.fb.group({
      password: ['', [Validators.required]]
    })
  }

  close() {
    this.dialogRef.close(false);
  }

  ok() {
    // this.dialogRef.close('data is sending back to parent comp');

    this.deleteConfirmForm.markAllAsTouched();

    // console.log(this.deleteConfirmForm.value.password)

    if (this.deleteConfirmForm.invalid) return;

    if (this.deleteConfirmForm.valid) {

      let returnData = {
        "password": this.deleteConfirmForm.value.password,
        action: true
      }
      this.dialogRef.close(returnData);
    }


  }
}


export class ConfirmDialogModel1 {
  constructor(public title: string, public message: string) { }
}
