import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/app/core/general.service';

@Component({
  selector: 'app-device-add-edit',
  templateUrl: './device-add-edit.component.html',
  styleUrls: ['./device-add-edit.component.css']
})
export class DeviceAddEditComponent {
  deviceForm: FormGroup = new FormGroup({});
  isSubmitted: boolean = false;
  userList: any = [];
  deviceTypeList: any = [];
  loading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private generalS: GeneralService,
    private activateR: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activateR.params.subscribe(params => {
      console.log('id => ', params['id'])
    })

    this.createDeviceForm();

    this.generalS.getAllUser().subscribe({
      next: res => {
        if (!res.error) {
          this.userList = res.data;
        } else {
          this.generalS.showError(res.message, 'Error');
        }
      },
      error: err => {
        this.generalS.showError(err, 'Error');
      }
    })

    this.generalS.getAllDeviceType().subscribe({

      next: res => {
        if (!res.error) {
          this.deviceTypeList = res.data;
        } else {
          this.generalS.showError(res.message, 'Error');
        }
      },
      error: err => {
        this.generalS.showError(err, 'Error');
      }
    })
  }

  createDeviceForm() {
    this.deviceForm = this.fb.group({
      deviceId: ['', [Validators.required]],
      deviceName: ['', [Validators.required]],
      user: ['', [Validators.required]],
      deviceType: ['', [Validators.required]]
    })
  }

  // convenience getter for easy access to form fields
  get f() { return this.deviceForm.controls; }

  onSubmit() {
    this.isSubmitted = true;
    this.deviceForm.markAllAsTouched();

    if (this.deviceForm.invalid) return;

    if (this.deviceForm.valid) {
      this.loading = true;
      this.generalS.addDevice(this.deviceForm.value).subscribe({
        next: (res) => {
          this.loading = false;
          if (!res.error) {
            this.generalS.showSuccess(res.message, 'Success');
            this.router.navigate(['/device']);
          } else {
            this.generalS.showError(res.message, 'Error');
          }
        },
        error: (err) => {
          this.loading = false;
          this.generalS.showError(err, 'Error');
        }
      })
    }
  }
}
