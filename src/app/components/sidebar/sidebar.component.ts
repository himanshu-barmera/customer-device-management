import { AfterViewInit, Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/core/general.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  isSidebarVisible: boolean = false;

  constructor(
    private generalS: GeneralService
  ) { }

  ngOnInit() {
    this.generalS.isSidebarVisible.subscribe(value => {
      this.isSidebarVisible = value;
    });

  }

}
