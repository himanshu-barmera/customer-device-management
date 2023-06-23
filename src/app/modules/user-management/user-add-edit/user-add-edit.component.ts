import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
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
  isSubmitted: boolean = false;
  loading = false;
  userList: any = []
  roleList: any = []

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private generalS: GeneralService,
    private activateR: ActivatedRoute,
    private authS: AuthService
  ) {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      companyName: [''],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.compose([Validators.required])],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      zip: ['', [Validators.required]],
      role: ['', [Validators.required]],
      customerName: ['', [Validators.required]],
    },
      { validator: ConfirmedValidator('password', 'confirmPassword') }
    )
  }

  ngOnInit(): void {
    this.activateR.params.subscribe(params => {
      console.log('id => ', params['id'])
    })

    this.generalS.getAllUser().subscribe({
      next: (res) => {
        if (!res.error) {
          this.roleList = res.data;
        } else {
          this.generalS.showError(res.message, 'Error');
        }
      },
      error: (error) => {
        this.generalS.showError(error, 'Error');
      }
    })


    this.generalS.getAllRole().subscribe({
      next: (res) => {
        if (!res.error) {
          this.roleList = res.data;
        } else {
          this.generalS.showError(res.message, 'Error');
        }
      },
      error: (error) => {
        this.generalS.showError(error, 'Error');
      }
    })

  }

  // convenience getter for easy access to form fields
  get f() { return this.userForm.controls; }

  onSubmit() {
    this.isSubmitted = true;
    this.userForm.markAllAsTouched();

    if (this.userForm.invalid) return;

    if (this.userForm.valid) {
      let roleId = JSON.parse(localStorage.getItem('e-c-user') || 'null').roleId;
      this.userForm.addControl('roleId', this.fb.control(roleId));

      this.loading = true;
      this.generalS.addNewUser(this.userForm.value).subscribe({
        next: (res) => {
          // console.log('res')
          // console.log(res)
          this.loading = false;
          if (!res.error && res.statusCode === 200) {
            this.generalS.showSuccess(res.message, 'Success');
            this.router.navigate(['/user']);
          } else {
            this.generalS.showError(res.message, 'Error');
          }
        },
        error: (error) => {
          // console.log('error');
          // console.log(error);

          this.loading = false;
          this.generalS.showError(error.message, 'Error');
        }
      })
    }
  }

}
