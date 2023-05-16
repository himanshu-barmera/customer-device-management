import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { NgMaterialModule } from 'src/app/ng-material.module';


@NgModule({
  declarations: [
    CustomerListComponent
  ],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    NgMaterialModule
  ]
})
export class UserManagementModule { }
