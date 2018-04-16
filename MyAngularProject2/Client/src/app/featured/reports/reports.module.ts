import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsPageComponent } from './pages/reports/reports.page';

@NgModule({
  imports: [CommonModule, ReportsRoutingModule],

  declarations: [ReportsPageComponent],

  exports: [ReportsRoutingModule]
})
export class ReportsModule {}
