import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  userForm: FormGroup;
  isSubmitted: boolean = false;
  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {

  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.userForm.invalid) {
      console.log('Invalid');
      return;
    }

    if (this.userForm.valid) {
      this.router.navigate(['/dashboard']);
    }
  }

}
