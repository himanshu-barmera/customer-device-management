import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/app/core/general.service';

export function ConfirmedValidator(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors['confirmedValidator']) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmedValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  }
}

@Component({
  selector: 'app-user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.css']
})
export class UserAddEditComponent implements OnInit {

  userForm: FormGroup = new FormGroup({});
  isSubmitted: boolean = false

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private generalS: GeneralService,
    private activateR: ActivatedRoute
  ) {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      company: [''],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      zip: ['', [Validators.required]],
      role: ['', [Validators.required]],
    },
      { validator: ConfirmedValidator('password', 'confirmPassword') }
    )
  }

  ngOnInit(): void {
    this.activateR.params.subscribe(params => {
      console.log('id => ', params['id'])
    })
  }

  // convenience getter for easy access to form fields
  get f() { return this.userForm.controls; }

  onSubmit() {
    this.isSubmitted = true;
    this.userForm.markAllAsTouched();

    if (this.userForm.invalid) return;

    if (this.userForm.valid) {
      console.log(this.userForm.value);
      this.generalS.showSuccess('User Added Successfully', 'Success');
      this.router.navigate(['/user']);
    }
  }

}
