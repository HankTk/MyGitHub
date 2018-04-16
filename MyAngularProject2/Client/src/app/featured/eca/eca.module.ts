import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EcaRoutingModule } from './eca-routing.module';
import { EcaPageComponent } from './pages/eca/eca.page';

@NgModule({
  imports: [CommonModule, EcaRoutingModule],

  declarations: [EcaPageComponent],

  exports: [EcaRoutingModule]
})
export class EcaModule {}
