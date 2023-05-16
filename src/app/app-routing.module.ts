import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'device', loadChildren: () => import('./modules/device-management/device-management.module').then(m => m.DeviceManagementModule) },
  {
    path: 'user', loadChildren: () => import('./modules/user-management/user-management.module'
    ).then(m => m.UserManagementModule)
  },
  { path: 'role', loadChildren: () => import('./modules/role-management/role-management.module').then(m => m.RoleManagementModule) },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
