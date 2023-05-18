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
  // convenience getter for easy access to form fields
  get f() { return this.roleForm.get('permissions') as FormArray }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private generalS: GeneralService,
    private activateR: ActivatedRoute
  ) {
    this.roleForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      permissions: this.fb.array([])
    })
  }

  ngOnInit(): void {
    this.activateR.params.subscribe(params => {
      // console.log('id => ', params['id'])
      this.getRoleById(params['id'])
    })
  }

  getRoleById(id: any) {
    this.generalS.getRoleById(id).subscribe(res => {
      if (res.statusCode === 200) {
        this.roleData = res.data[0];
        // this.roleForm.patchValue(this.roleData);

        console.log(this.roleData.permissions)




        this.roleForm.patchValue({
          title: this.roleData.title,
          description: this.roleData.description,
          // permissions: this.fb.array([...x])

        })

        this.roleData.permissions.forEach((item: any) => {
          let x = this.fb.group({
            "roleId": [item.roleId],
            "permissionId": [item.permissionId],
            "add": [item.add],
            "read": [item.read],
            "edit": [item.edit],
            "remove": [item.remove],
            "patch": [item.patch],
            "access": [item.access],
            "permission": [item.permission]
          })
          console.log(this.f);


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
