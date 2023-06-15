import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './modules/layout.component';
import { AuthGuard } from './core/auth.guard';

const routes: Routes = [

  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      {
        path: 'device',
        loadChildren: () => import('./modules/device-management/device-management.module').then(m => m.DeviceManagementModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'user',
        loadChildren: () => import('./modules/user-management/user-management.module').then(m => m.UserManagementModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'role',
        loadChildren: () => import('./modules/role-management/role-management.module').then(m => m.RoleManagementModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'device-type',
        loadChildren: () => import('./modules/device-type-management/device-type-management.module').then(m => m.DeviceTypeManagementModule),
        canActivate: [AuthGuard]
      },
      // { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
  ,
  { path: 'login', component: LoginComponent },
  // { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
