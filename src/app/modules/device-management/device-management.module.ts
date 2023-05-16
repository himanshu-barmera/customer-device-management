import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeviceManagementRoutingModule } from './device-management-routing.module';
import { DeviceListComponent } from './device-list/device-list.component';


@NgModule({
  declarations: [
    DeviceListComponent
  ],
  imports: [
    CommonModule,
    DeviceManagementRoutingModule
  ]
})
export class DeviceManagementModule { }
