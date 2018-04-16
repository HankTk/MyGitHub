import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TfocRoutingModule } from './tfoc-routing.module';
import { TfocPageComponent } from './pages/tfoc/tfoc.page';

@NgModule({
  imports: [CommonModule, TfocRoutingModule],

  declarations: [TfocPageComponent],

  exports: [TfocRoutingModule]
})
export class TfocModule {}
