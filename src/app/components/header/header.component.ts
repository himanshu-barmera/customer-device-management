import { AfterViewInit, Component } from '@angular/core';
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
    private generalS: GeneralService
  ) { }

  ngAfterViewInit(): void { }

  toggleSidebar(str: any) {

    if (str === 'show')
      this.generalS.isSidebarVisible.next(true);
    else this.generalS.isSidebarVisible.next(false);

    this.generalS.isSidebarVisible.subscribe(res => {
      this.isSidebarVisible = res;
    });


  }
}
