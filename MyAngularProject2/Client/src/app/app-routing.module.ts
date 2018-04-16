import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AuthGuard } from './shared/guards/authGuard.guard';
import { AppPreloadingStrategy } from './shared/strategies/appLoading.strategy';
import { LoginPageComponent } from './featured/authentication/pages/login/login.page';
import { LogoutComponent } from './featured/authentication/components/logout/logout.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'logout',
    canActivate: [AuthGuard],
    component: LogoutComponent,
    data: { preload: true, delay: false }
  },
  {
    path: 'fleet',
    canActivate: [AuthGuard],
    loadChildren: './featured/fleetview/fleetview.module#FleetviewModule',
    data: { preload: true, delay: false }
  },
  {
    path: 'ship',
    canActivate: [AuthGuard],
    loadChildren: './featured/shipview/shipview.module#ShipviewModule',
    data: { preload: true, delay: false }
  },
  {
    path: 'notifications',
    canActivate: [AuthGuard],
    loadChildren:
      './featured/notifications/notifications.module#NotificationsModule',
    data: { preload: true, delay: false }
  },
  {
    path: 'asset',
    canActivate: [AuthGuard],
    loadChildren: './featured/assetview/assetsview.module#AssetviewModule',
    data: { preload: true, delay: true }
  },
  {
    path: 'cases',
    canActivate: [AuthGuard],
    loadChildren: './featured/cases/cases.module#CasesModule',
    data: { preload: true, delay: true }
  },
  {
    path: 'rmd',
    canActivate: [AuthGuard],
    loadChildren: './featured/rmd/rmd.module#RmdModule',
    data: { preload: true, delay: true }
  },
  {
    path: 'reports',
    canActivate: [AuthGuard],
    loadChildren: './featured/reports/reports.module#ReportsModule',
    data: { preload: true, delay: true }
  },
  {
    path: 'cameras',
    canActivate: [AuthGuard],
    loadChildren: './featured/cameras/cameras.module#CamerasModule',
    data: { preload: true, delay: true }
  },
  {
    path: 'chat',
    canActivate: [AuthGuard],
    loadChildren: './featured/chat/chat.module#ChatModule',
    data: { preload: true, delay: true }
  },
  {
    path: 'tfoc',
    canActivate: [AuthGuard],
    loadChildren: './featured/tfoc/tfoc.module#TfocModule',
    data: { preload: true, delay: true }
  },
  {
    path: 'eca',
    canActivate: [AuthGuard],
    loadChildren: './featured/eca/eca.module#EcaModule',
    data: { preload: true, delay: true }
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: AppPreloadingStrategy
    })
  ],

  exports: [RouterModule]
})
export class AppRoutingModule {}
