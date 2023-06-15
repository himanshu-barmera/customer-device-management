import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { NgMaterialModule } from 'src/app/ng-material.module';
import { UserAddEditComponent } from './user-add-edit/user-add-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from 'src/app/shared.module';
import { CustomerUserListComponent } from './customer-user-list/customer-user-list.component';


@NgModule({
  declarations: [
    CustomerListComponent,
    UserAddEditComponent,
    CustomerUserListComponent
  ],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    SharedModule
  ]
})
export class UserManagementModule { }
