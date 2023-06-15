import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeviceTypeManagementRoutingModule } from './device-type-management-routing.module';
import { AddEditComponent } from './add-edit/add-edit.component';
import { ListComponent } from './list/list.component';
import { NgMaterialModule } from 'src/app/ng-material.module';
import { SharedModule } from 'src/app/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AddEditComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    DeviceTypeManagementRoutingModule,
    ReactiveFormsModule,
    NgMaterialModule,
    SharedModule
  ]
})
export class DeviceTypeManagementModule { }
