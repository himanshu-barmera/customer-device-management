import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private generalS: GeneralService,
    // private activateR: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // this.activateR.params.subscribe(params => {
    //   console.log('id => ', params['id'])
    // })

    this.getDeviceType(this.generalS.deviceTypeId);

    this.createDeviceTypeForm();
  }

  getDeviceType(deviceTypeId: string) {
    if (deviceTypeId) {
      // this.generalS.getDeviceTypeById(deviceTypeId).subscribe(res => {
      //   console.log('res => ')
      //   console.log(res)
      //   // this.deviceForm.patchValue(res)
      // })
    }
  }


  createDeviceTypeForm() {
    this.deviceForm = this.fb.group({
      hardwareType: ['', [Validators.required]]
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
      this.generalS.addDeviceType(this.deviceForm.value).subscribe({

        next: (res) => {
          if (!res.error) {
            this.generalS.showSuccess(res.message, 'Success');
            this.loading = false;
            this.router.navigate(['/device-type']);
          } else {
            this.generalS.showError(res.message, 'Error');
            this.loading = false;
          }
        },
        error: (err) => {
          this.generalS.showError(err, "Logged In Error");
          this.loading = false;
        }
      })
    }
  }

}
