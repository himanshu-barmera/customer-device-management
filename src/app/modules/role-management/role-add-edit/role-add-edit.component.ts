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

  }

  getRoleById(id: any) {
    this.generalS.getRoleById(id).subscribe(res => {
      if (res.statusCode === 200) {
        this.roleData = res.data[0];
        this.roleForm = this.initializeRoleForm(res.data[0]);
      }
    })
  }


  onSubmit() {
    this.isSubmitted = true;
    this.roleForm.markAllAsTouched();

    if (this.roleForm.invalid) return;

    if (this.roleForm.valid) {
      console.log(this.roleForm.value);
      this.generalS.showSuccess('Role Added Successfully', 'Success');
      this.router.navigate(['/role']);
    }
  }


  initializeRoleForm(roleData?: any) {
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
