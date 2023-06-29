import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GeneralService } from 'src/app/core/general.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
  deviceForm: FormGroup = new FormGroup({});
  isSubmitted: boolean = false;
  loading = false;
  deviceTypeId: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private generalS: GeneralService,
    private activateR: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activateR.params.subscribe(params => {
      console.log('id => ', params['id'])
      this.deviceTypeId = params['id'];
      this.getDeviceType(this.deviceTypeId);
    })

    this.createDeviceTypeForm();
  }

  getDeviceType(deviceTypeId: string) {
    if (deviceTypeId) {
      this.generalS.getDeviceTypeById(deviceTypeId).subscribe({
        next: res => {
          console.log('get devicetypeid => ')
          console.log(res)
          if (!res.error) {
            this.deviceForm.patchValue(res.data)
            this.deviceForm.addControl('id', this.fb.control(res.data.id));
          } else {
            this.generalS.showError(res.message, 'Error');
          }
        },
        error: err => {
          this.generalS.showError(err, "Error");
        }
      })
    }
  }


  createDeviceTypeForm() {
    this.deviceForm = this.fb.group({
      hardwareType: ['', [Validators.required]],
    })
  }

  // convenience getter for easy access to form fields
  get f() { return this.deviceForm.controls; }

  onSubmit() {
    this.isSubmitted = true;
    this.deviceForm.markAllAsTouched();

    if (this.deviceForm.invalid) return;

    if (this.deviceForm.valid) {
      console.log(this.deviceForm.value);
      this.loading = true;
      let apiMethod: any;
      if (this.deviceForm.value.id) {
        apiMethod = this.generalS.updateDeviceType(this.deviceForm.value);
      }
      else {
        apiMethod = this.generalS.addDeviceType(this.deviceForm.value);
      }
      apiMethod.subscribe({
        next: (res: { error: any; message: string; }) => {
          if (!res.error) {
            this.generalS.showSuccess(res.message, 'Success');
            this.loading = false;
            this.router.navigate(['/device-type']);
          } else {
            this.generalS.showError(res.message, 'Error');
            this.loading = false;
          }
        },
        error: (err: string) => {
          this.generalS.showError(err, "Error");
          this.loading = false;
        }
      })
    }
  }

}
