import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/core/auth.service';
import { GeneralService } from 'src/app/core/general.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  userForm: FormGroup;
  loading = false;
  isSubmitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authS: AuthService,
    private generalS: GeneralService
  ) {
    this.userForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit(): void { }

  onSubmit() {
    this.isSubmitted = true;

    if (this.userForm.invalid) {
      console.log('Invalid');
      return;
    }

    if (this.userForm.valid) {
      this.loading = true;
      // this.router.navigate(['/dashboard']);
      this.authS.login(this.userForm.value.username, this.userForm.value.password).pipe(first()).subscribe({
        next: (res) => {
          this.generalS.showSuccess("Logged In Successfully!");
          // get return url from query parameters or default to home page
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
        },
        error: (err) => {
          // this.alertService.error(error);
          // console.log(err);
          this.generalS.showError(err, "Logged In Error");
          this.loading = false;
        }
      })
    }
  }

}
