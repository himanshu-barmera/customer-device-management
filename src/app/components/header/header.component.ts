import { AfterViewInit, Component } from '@angular/core';
import { Event, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
import { GeneralService } from 'src/app/core/general.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit {

  isSidebarVisible: boolean = false;
  dropdownOpen: boolean = false;

  constructor(
    private generalS: GeneralService,
    private router: Router,
    private authS: AuthService
  ) {

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        // this.showHideMenu();
        this.dropdownOpen = false;
      }

      if (event instanceof NavigationEnd) {
        // this.showHideMenu();
        this.dropdownOpen = false;
      }
    })
  }

  ngAfterViewInit(): void { }

  clickedOutside(): void {
    this.dropdownOpen = false;
  }

  toggleSidebar(str: any) {

    if (str === 'show')
      this.generalS.isSidebarVisible.next(true);
    else
      this.generalS.isSidebarVisible.next(false);

    this.generalS.isSidebarVisible.subscribe(res => {
      this.isSidebarVisible = res;
    });
  }

  showHideMenu() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout() {
    this.authS.logout();
  }
}
