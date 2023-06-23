import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/app/core/general.service';


@Component({
  selector: 'app-role-add-edit',
  templateUrl: './role-add-edit.component.html',
  styleUrls: ['./role-add-edit.component.css']
})
export class RoleAddEditComponent {
  roleForm!: FormGroup;
  isSubmitted: boolean = false
  roleData: any;
  roleId: number = 0;
  loading = false;

  // convenience getter for easy access to form fields
  get f() { return this.roleForm.get('permissions') as FormArray }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private generalS: GeneralService,
    private activateR: ActivatedRoute
  ) { }

  ngOnInit(): void {

    console.log(this.generalS.roleId)

    this.getRoleById(this.generalS.roleId ? this.generalS.roleId : '')

  }

  getRoleById(id: any) {
    if (id) {
      this.generalS.getRoleById(id).subscribe({
        next: res => {
          console.log(res)
          if (!res.error) {
            this.roleData = res.data[0];
            this.roleForm = this.initializeRoleForm(res.data[0]);
          } else {
            this.generalS.showError(res.message, 'Error');
          }
        },
        error: err => {
          this.generalS.showError(err, 'Error');
        }
      })
    } else {
      this.roleForm = this.initializeRoleForm();
    }

  }


  onSubmit() {
    this.isSubmitted = true;
    this.roleForm.markAllAsTouched();

    if (this.roleForm.invalid) return;

    if (this.roleForm.valid) {
      // console.log(this.roleForm.value);
      // this.generalS.showSuccess('Role Added Successfully', 'Success');
      // this.router.navigate(['/role']);
      this.loading = true;

      this.roleForm.addControl('slug', this.fb.control(' '));
      this.roleForm.addControl('content', this.fb.control(' '));
      this.roleForm.addControl('status', this.fb.control(' '));

      this.generalS.addRole(this.roleForm.value).subscribe({
        next: res => {
          this.loading = false;
          if (!res.error) {
            this.generalS.showSuccess(res.message, 'Success');
            this.router.navigate(['/role']);
          }
          else {
            this.generalS.showError(res.message, 'Error');
          }

        },
        error: err => {
          this.loading = false;
          this.generalS.showError(err, 'Error');
        }
      }

      )


    }
  }


  initializeRoleForm(roleData?: any) {
    // console.log('here')

    let permissions: any = [];
    permissions = [
      {
        "add": false,
        "read": false,
        "edit": false,
        "remove": false,
        "patch": false,
        "access": false,
        "permission": "profile"
      },
      {
        "add": false,
        "read": false,
        "edit": false,
        "remove": false,
        "patch": false,
        "access": false,
        "permission": "device"
      },
      {
        "add": false,
        "read": false,
        "edit": false,
        "remove": false,
        "patch": false,
        "access": false,
        "permission": "role"
      },
      {
        "add": false,
        "read": false,
        "edit": false,
        "remove": false,
        "patch": false,
        "access": false,
        "permission": "user"
      }
    ]

    // check if roleData.permissions is not empty then assign it to permissions
    if (roleData?.permissions) {
      permissions = roleData.permissions;
    }
    // Create RoleForm Either with RoleData or Initial Value
    return this.fb.group({
      title: [roleData?.title ?? '', [Validators.required]],
      description: [roleData?.description ?? '', [Validators.required]],
      permissions: this.fb.array([
        ...permissions.map((permission: any) => {
          return this.fb.group({
            "roleId": [permission.roleId ?? ''],
            "permissionId": [permission.permissionId ?? ''],
            "add": [permission.add],
            "edit": [permission.edit],
            "read": [permission.read],
            "patch": [permission.patch],
            "access": [permission.access],
            "remove": [permission.remove],
            "permission": [permission.permission]
          })
        })
      ]),
      status: [null, [Validators.required]]
    })
  }
}
