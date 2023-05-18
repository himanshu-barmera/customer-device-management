import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleManagementRoutingModule } from './role-management-routing.module';
import { RoleListComponent } from './role-list/role-list.component';
import { NgMaterialModule } from 'src/app/ng-material.module';
import { SharedModule } from 'src/app/shared.module';
import { RoleAddEditComponent } from './role-add-edit/role-add-edit.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RoleListComponent,
    RoleAddEditComponent
  ],
  imports: [
    CommonModule,
    RoleManagementRoutingModule,
    ReactiveFormsModule,
    NgMaterialModule,
    SharedModule
  ]
})
export class RoleManagementModule { }
