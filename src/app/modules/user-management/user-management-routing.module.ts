import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { UserAddEditComponent } from './user-add-edit/user-add-edit.component';
import { CustomerUserListComponent } from './customer-user-list/customer-user-list.component';

const routes: Routes = [
  { path: '', component: CustomerListComponent },
  { path: 'list', component: CustomerListComponent },
  { path: 'add', component: UserAddEditComponent },
  { path: 'edit/:id', component: UserAddEditComponent },
  { path: 'customer-user-list', component: CustomerUserListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
