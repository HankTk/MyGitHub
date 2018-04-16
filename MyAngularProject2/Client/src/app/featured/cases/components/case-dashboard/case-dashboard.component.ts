import { Component, OnInit } from '@angular/core';
import {select} from '@angular-redux/store';
import {IAppState} from '../../../../redux/store';
import {CASES_CLEAR} from '../../../../redux/cases/actions';
import {CasesService} from '../../../../shared/services/cases.service';

@Component({
  selector: 'app-case-dashboard',
  templateUrl: './case-dashboard.component.html',
  styleUrls: ['./case-dashboard.component.scss']
})
export class CaseDashboardComponent implements OnInit {

  @select(s => s.caseManagement.cases) cases;
  @select(s => s.caseManagement.lastUpdate) lastUpdate;

  /**
   * constructor
   *
   * @param {NgRedux<IAppState>} ngRedux
   * @param {CasesService} service
   */
  constructor(
    private service: CasesService
  ) {
  }

  /**
   * ngOnInit
   *
   */
  ngOnInit() {
  }

  /**
   * clearCases
   *
   */
  clearCases() {
    this.service.clearCases();
  }

}
