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

    this.createDeviceTypeForm();
  }

  createDeviceTypeForm() {
    this.deviceForm = this.fb.group({
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
      console.log(this.deviceForm.value);
      this.generalS.showSuccess('Device Type Added Successfully', 'Success');
      this.router.navigate(['/device-type']);
    }
  }

}
