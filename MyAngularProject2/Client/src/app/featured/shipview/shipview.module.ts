import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShipviewRoutingModule } from './shipview-routing.module';
import { ShipviewPageComponent } from './pages/shipview/shipview.page';

@NgModule({
  imports: [CommonModule, ShipviewRoutingModule],

  declarations: [ShipviewPageComponent],

  exports: [ShipviewRoutingModule]
})
export class ShipviewModule {}
