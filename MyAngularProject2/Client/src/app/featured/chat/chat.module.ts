import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatPageComponent } from './pages/chat/chat.page';

@NgModule({
  imports: [CommonModule, ChatRoutingModule],

  declarations: [ChatPageComponent],

  exports: [ChatRoutingModule]
})
export class ChatModule {}
