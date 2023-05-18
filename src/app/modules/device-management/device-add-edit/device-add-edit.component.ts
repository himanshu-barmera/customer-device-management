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
  isSubmitted: boolean = false

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private generalS: GeneralService,
    private activateR: ActivatedRoute
  ) {
    this.deviceForm = this.fb.group({
      deviceId: ['', [Validators.required]],
      deviceName: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.activateR.params.subscribe(params => {
      console.log('id => ', params['id'])
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
      this.generalS.showSuccess('Device Added Successfully', 'Success');
      this.router.navigate(['/device']);
    }
  }
}
