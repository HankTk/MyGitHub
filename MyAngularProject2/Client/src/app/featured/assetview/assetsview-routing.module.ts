import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssetOverviewPageComponent } from './pages/assetOverview/assetOverview.page';
import { AssetDiagnosticsPageComponent } from './pages/assetDiagnostics/assetDiagnostics.page';
import { AssetDocumentsPageComponent } from './pages/assetDocuments/assetDocuments.page';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'overview' },
  { path: 'overview', component: AssetOverviewPageComponent },
  { path: 'diagnostics', component: AssetDiagnosticsPageComponent },
  { path: 'documents', component: AssetDocumentsPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule]
})
export class AssetviewRoutingModule {}
