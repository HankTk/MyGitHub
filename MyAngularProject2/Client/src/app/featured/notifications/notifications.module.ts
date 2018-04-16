import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationsRoutingModule } from './notifications-routing.module';
import { NotificationsPageComponent } from './pages/notifications/notifications.page';

@NgModule({
  imports: [CommonModule, NotificationsRoutingModule],

  declarations: [NotificationsPageComponent],

  exports: [NotificationsRoutingModule]
})
export class NotificationsModule {}
