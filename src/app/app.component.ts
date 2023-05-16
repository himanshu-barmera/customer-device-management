import { Component } from '@angular/core';
import { GeneralService } from './core/general.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'customer-device-management';
  isSidebarVisible: boolean = false;
  constructor(
    private generalS: GeneralService
  ) {
    this.generalS.isSidebarVisible.subscribe(res => {
      this.isSidebarVisible = res;
    })
  }
}
