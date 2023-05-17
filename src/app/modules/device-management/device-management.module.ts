import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeviceManagementRoutingModule } from './device-management-routing.module';
import { DeviceListComponent } from './device-list/device-list.component';
import { NgMaterialModule } from 'src/app/ng-material.module';
import { SharedModule } from 'src/app/shared.module';
import { DeviceAddEditComponent } from './device-add-edit/device-add-edit.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DeviceListComponent,
    DeviceAddEditComponent
  ],
  imports: [
    CommonModule,
    DeviceManagementRoutingModule,
    ReactiveFormsModule,
    NgMaterialModule,
    SharedModule
  ]
})
export class DeviceManagementModule { }
