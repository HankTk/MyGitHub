import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FleetviewRoutingModule } from './fleetview-routing.module';
import { FleetviewPageComponent } from './pages/fleetview/fleetview.page';

@NgModule({
  imports: [CommonModule, FleetviewRoutingModule],

  declarations: [FleetviewPageComponent],

  exports: [FleetviewRoutingModule]
})
export class FleetviewModule {}
