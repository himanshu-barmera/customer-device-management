import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeviceManagementRoutingModule } from './device-management-routing.module';
import { DeviceListComponent } from './device-list/device-list.component';
import { NgMaterialModule } from 'src/app/ng-material.module';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
  declarations: [
    DeviceListComponent
  ],
  imports: [
    CommonModule,
    DeviceManagementRoutingModule,
    NgMaterialModule,
    SharedModule
  ]
})
export class DeviceManagementModule { }
