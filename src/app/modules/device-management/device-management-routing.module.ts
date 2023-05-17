import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeviceListComponent } from './device-list/device-list.component';
import { DeviceAddEditComponent } from './device-add-edit/device-add-edit.component';

const routes: Routes = [
  { path: '', component: DeviceListComponent },
  { path: 'add', component: DeviceAddEditComponent },
  { path: 'edit/:id', component: DeviceAddEditComponent },
  { path: 'list', component: DeviceListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeviceManagementRoutingModule { }
