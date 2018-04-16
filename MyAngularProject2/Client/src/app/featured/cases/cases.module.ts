import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CasesRoutingModule } from './cases-routing.module';
import { CasesPageComponent } from './pages/cases/cases.page';
import { CaseListComponent } from './components/case-list/case-list.component';
import { CaseDashboardComponent } from './components/case-dashboard/case-dashboard.component';
import { MessagesComponent } from './components/messages/messages.component';
import { CasesService } from '../../shared/services/cases.service';

@NgModule({
  imports: [CommonModule, CasesRoutingModule],

  declarations: [
    CasesPageComponent,
    CaseDashboardComponent,
    CaseListComponent,
    MessagesComponent
  ],
  providers: [CasesService],
  exports: [CasesRoutingModule]
})
export class CasesModule {}
