import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssetviewRoutingModule } from './assetsview-routing.module';
import { AssetOverviewPageComponent } from './pages/assetOverview/assetOverview.page';
import { AssetDiagnosticsPageComponent } from './pages/assetDiagnostics/assetDiagnostics.page';
import { AssetDocumentsPageComponent } from './pages/assetDocuments/assetDocuments.page';

@NgModule({
  imports: [CommonModule, AssetviewRoutingModule],

  declarations: [
    AssetOverviewPageComponent,
    AssetDiagnosticsPageComponent,
    AssetDocumentsPageComponent
  ],

  exports: [AssetviewRoutingModule]
})
export class AssetviewModule {}
