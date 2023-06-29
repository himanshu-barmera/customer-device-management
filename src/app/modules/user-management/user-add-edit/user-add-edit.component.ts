import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  userId: any;
  isFieldShow: boolean = false

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private generalS: GeneralService,
    private activateR: ActivatedRoute,
    private authS: AuthService,
    private cdr: ChangeDetectorRef
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
      state: [''],
      city: [''],
      zip: [''],
      roleId: ['', [Validators.required]],
      manufacturerId: ['', [Validators.required]],
    },
      { validator: ConfirmedValidator('password', 'confirmPassword') }
    )
  }

  ngOnInit(): void {
    this.activateR.params.subscribe(params => {
      this.userId = params['id'];
      this.getUserById(this.userId);
    })

    this.getAllUsers();
    this.getAllRoles();
  }

  getUserById(id: any) {
    if (id) {
      this.generalS.getUserDataById(id).subscribe({
        next: res => {
          console.log('user data by id')
          console.log(res)
          if (!res.error) {
            this.userForm.patchValue(res.data)
          } else {
            this.generalS.showError(res.message, 'Error');
          }
        },
        error: err => {
          this.generalS.showError(err, 'Error');
        }
      })
    }
  }

  getAllUsers() {
    this.generalS.getAllUser().subscribe({
      next: (res) => {
        if (!res.error) {
          this.userList = res.data;
        } else {
          this.generalS.showError(res.message, 'Error');
        }
      },
      error: (error) => {
        this.generalS.showError(error, 'Error');
      }
    })
  }

  getAllRoles() {
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

    console.log('userForm')
    console.log(this.userForm)

    if (this.userForm.invalid) return;

    if (this.userForm.valid) {
      this.loading = true;

      let apiMethod: any;

      if (this.userForm.value.id) {
        if (!this.userForm.get('password')?.value) {
          this.userForm.get('password')?.clearValidators();
          this.userForm.get('password')?.updateValueAndValidity();
        }

        if (!this.userForm.get('confirmPassword')?.value) {
          this.userForm.get('confirmPassword')?.clearValidators();
          this.userForm.get('confirmPassword')?.updateValueAndValidity();
        }

        apiMethod = this.generalS.updateUser(this.userForm.value)
      } else {
        apiMethod = this.generalS.addNewUser(this.userForm.value)
      }

      apiMethod.subscribe({
        next: (res: { error: any; statusCode: number; message: string; }) => {
          this.loading = false;
          if (!res.error && res.statusCode === 200) {
            this.generalS.showSuccess(res.message, 'Success');
            this.router.navigate(['/user']);
          } else {
            this.generalS.showError(res.message, 'Error');
          }
        },
        error: (error: any) => {
          this.loading = false;
          this.generalS.showError(error, 'Error');
        }
      })
    }
  }

  onRoleChange(roleId: any) {

    let tmpData = this.roleList.filter((role: any) => {
      if (role.id === roleId && role.title === 'manufacturer')
        return role;
    })

    if (tmpData.length > 0) {
      // console.log(tmpData)
      this.isFieldShow = true;
      // this.userForm.get('companyName')?.setValidators([Validators.required]);
      // this.userForm.get('companyName')?.updateValueAndValidity();
      // this.cdr.markForCheck();
    } else {
      this.isFieldShow = false
      // this.userForm.get('companyName')?.clearValidators();
      // this.userForm.get('companyName')?.updateValueAndValidity();
      // this.cdr.markForCheck();
    }
  }


}
