import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleManagementRoutingModule } from './role-management-routing.module';
import { RoleListComponent } from './role-list/role-list.component';
import { NgMaterialModule } from 'src/app/ng-material.module';
import { SharedModule } from 'src/app/shared.module';


@NgModule({
  declarations: [
    RoleListComponent
  ],
  imports: [
    CommonModule,
    RoleManagementRoutingModule,
    NgMaterialModule,
    SharedModule
  ]
})
export class RoleManagementModule { }
