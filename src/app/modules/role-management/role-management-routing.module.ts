import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleListComponent } from './role-list/role-list.component';
import { RoleAddEditComponent } from './role-add-edit/role-add-edit.component';

const routes: Routes = [
  { path: '', component: RoleListComponent },
  { path: 'add', component: RoleAddEditComponent },
  // { path: 'edit/:id', component: RoleAddEditComponent },
  { path: 'edit', component: RoleAddEditComponent },
  { path: 'list', component: RoleListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleManagementRoutingModule { }
