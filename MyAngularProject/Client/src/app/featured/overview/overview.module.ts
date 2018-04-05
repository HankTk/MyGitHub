import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverviewRoutingModule } from './overview-routing.module';
import { ShipviewPageComponent } from './pages/shipview/shipview.page';
import { OverviewService } from './services/overview.service';
import { HomeComponent } from './pages/home/home.component';
import {CasesListComponent} from './components/casesManagement/cases-list/cases-list.component';
import {CasesDashboardComponent} from './components/casesManagement/cases-dashboard/cases-dashboard.component';
import {CasesService} from '../../shared/services/cases.service';
import { MessagingModule } from '../../shared/modules/messaging/messaging.module';


@NgModule({
  imports: [
    CommonModule,
    MessagingModule,
    OverviewRoutingModule
  ],
  declarations: [
    ShipviewPageComponent,
    HomeComponent,
    CasesListComponent,
    CasesDashboardComponent,
  ],
  providers: [
    OverviewService,
    CasesService
  ]
})
export class OverviewModule { }
