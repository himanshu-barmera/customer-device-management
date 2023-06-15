import { Component, OnInit } from '@angular/core';
import { GeneralService } from './core/general.service';
import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'E-Commissioning App';
  constructor() { }
  ngOnInit(): void { }
}
