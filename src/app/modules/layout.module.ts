import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { HeaderComponent } from '../components/header/header.component';
import { SharedModule } from '../shared.module';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { DeviceManagementModule } from './device-management/device-management.module';
import { RoleManagementModule } from './role-management/role-management.module';
import { UserManagementModule } from './user-management/user-management.module';

@NgModule({
  declarations: [
    LayoutComponent,
    SidebarComponent,
    HeaderComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DeviceManagementModule,
    RoleManagementModule,
    UserManagementModule,
  ]
})
export class LayoutModule { }
