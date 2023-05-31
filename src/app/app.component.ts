import { Component } from '@angular/core';
import { GeneralService } from './core/general.service';
// import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'e-commissioning';
  isSidebarVisible: boolean = false;
  isLoggedIn: boolean = true;
  constructor(
    private generalS: GeneralService,
    // private authS: AuthService
  ) {
    this.generalS.isSidebarVisible.subscribe(res => {
      this.isSidebarVisible = res;
    })

    // this.authS.isUserLoggedIn.subscribe(res => {
    //   this.isLoggedIn = res;
    // })
  }
}
