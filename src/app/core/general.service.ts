import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  isSidebarVisible: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor() { }

}
