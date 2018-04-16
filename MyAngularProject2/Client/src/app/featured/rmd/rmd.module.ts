import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RmdRoutingModule } from './rmd-routing.module';
import { RmdPageComponent } from './pages/rmd/rmd.page';

@NgModule({
  imports: [CommonModule, RmdRoutingModule],

  declarations: [RmdPageComponent],

  exports: [RmdRoutingModule]
})
export class RmdModule {}
