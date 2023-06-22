import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { AddEditComponent } from './add-edit/add-edit.component';

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'add', component: AddEditComponent },
  // { path: 'edit/:id', component: AddEditComponent },
  { path: 'edit', component: AddEditComponent },
  { path: 'list', component: ListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeviceTypeManagementRoutingModule { }
