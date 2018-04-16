import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CamerasRoutingModule } from './cameras-routing.module';
import { CamerasPageComponent } from './pages/cameras/cameras.page';

@NgModule({
  imports: [CommonModule, CamerasRoutingModule],

  declarations: [CamerasPageComponent],

  exports: [CamerasRoutingModule]
})
export class CamerasModule {}
