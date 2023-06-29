import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/app/core/general.service';

@Component({
  selector: 'app-device-add-edit',
  templateUrl: './device-add-edit.component.html',
  styleUrls: ['./device-add-edit.component.css']
})
export class DeviceAddEditComponent implements OnInit, AfterViewInit {
  deviceForm: FormGroup = new FormGroup({});
  isSubmitted: boolean = false;
  userList: any = [];
  deviceTypeList: any = [];
  loading = false;
  deviceId!: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private generalS: GeneralService,
    private activateR: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activateR.params.subscribe(params => {
      console.log('id => ', params['id'])
      this.deviceId = params['id'];
      if (this.deviceId) {
        this.getDeviceById(this.deviceId);
      }
    })

    this.createDeviceForm();
    this.getAllDeviceType();
    this.getAllUsers();
  }
  ngAfterViewInit(): void { }

  getStatus(deviceid: string) {
    return deviceid ? true : false;
  }

  getDeviceById(deviceId: string) {
    if (deviceId) {
      this.generalS.getDeviceById(deviceId).subscribe({
        next: res => {
          if (!res.error) {
            // this.deviceForm.patchValue(res.data);
            this.deviceForm.patchValue({
              devId: res.data.devId,
              deviceName: res.data.hardware.deviceName,
              dealerId: res.data.battery.dealerId,
              hardwareTypeId: res.data.hardware.hardwareTypeId,
              macId: res.data.hardware.macId,
            });
            this.deviceForm.addControl('bmsid', this.fb.control(res.data.id));
            this.deviceForm.get('devId')?.disable({ onlySelf: true });
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

  createDeviceForm() {
    this.deviceForm = this.fb.group({
      devId: ['', [Validators.required]],
      deviceName: ['', [Validators.required]],
      dealerId: ['', [Validators.required]],
      hardwareTypeId: ['', [Validators.required]],
      macId: ['', [Validators.required]],
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

      this.deviceForm.addControl('inventory', this.fb.control(false));
      this.deviceForm.addControl('immobiliser_manufacturer', this.fb.control(false));
      this.deviceForm.addControl('immobiliser_cust', this.fb.control(false));

      console.log(this.deviceForm.value)
      let apiMethod: any;
      if (this.deviceId) {
        this.deviceForm.addControl('bmsid', this.fb.control(this.deviceForm.value.devId))
        apiMethod = this.generalS.updateDevice(this.deviceForm.value);
      } else {
        apiMethod = this.generalS.addDevice(this.deviceForm.value);
      }

      apiMethod.subscribe({
        next: (res: { error: any; message: string; }) => {
          this.loading = false;
          if (!res.error) {
            this.generalS.showSuccess(res.message, 'Success');
            this.router.navigate(['/device']);
          } else {
            this.generalS.showError(res.message, 'Error');
          }
        },
        error: (err: string) => {
          this.loading = false;
          this.generalS.showError(err, 'Error');
        }
      })
    }
  }

  getAllUsers() {
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
  }
  getAllDeviceType() {
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
}
