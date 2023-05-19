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
  roleForm: FormGroup = new FormGroup({});
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
    this.createForm();
    this.activateR.params.subscribe(params => {
      if (params['id']) {
        this.roleId = params['id'];
        this.getRoleById(params['id'])
      }
    })
  }

  createForm() {
    this.roleForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      permissions: this.fb.array([
        this.fb.group({
          "roleId": [],
          "permissionId": [],
          "add": [],
          "edit": [],
          "read": [],
          "patch": [],
          "access": [],
          "remove": [],
          "permission": ['profile']
        }),
        this.fb.group({
          "roleId": [],
          "permissionId": [],
          "add": [],
          "edit": [],
          "read": [],
          "patch": [],
          "access": [],
          "remove": [],
          "permission": ['device']
        }),
        this.fb.group({
          "roleId": [],
          "permissionId": [],
          "add": [],
          "edit": [],
          "read": [],
          "patch": [],
          "access": [],
          "remove": [],
          "permission": ['role']
        }),
        this.fb.group({
          "roleId": [],
          "permissionId": [],
          "add": [],
          "edit": [],
          "read": [],
          "patch": [],
          "access": [],
          "remove": [],
          "permission": ['user']
        })
      ]),
      status: [null, [Validators.required]]
    })
  }

  getRoleById(id: any) {
    this.generalS.getRoleById(id).subscribe(res => {
      if (res.statusCode === 200) {
        this.roleData = res.data[0];
        this.roleForm.patchValue({
          title: this.roleData.title,
          description: this.roleData.description,
          status: this.roleData.status
        })

        this.roleData.permissions.forEach((item: any) => {
          let x = this.fb.group({
            "roleId": [item.roleId],
            "permissionId": [item.permissionId],
            "add": [item.add],
            "edit": [item.edit],
            "read": [item.read],
            "patch": [item.patch],
            "access": [item.access],
            "remove": [item.remove],
            "permission": [item.permission]
          })

          this.f.push(x)

        })

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
}
