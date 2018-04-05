/**
 * CaseDashboardComponent
 *
 */
import {Component} from '@angular/core';
import {NgRedux, select} from '@angular-redux/store';
import {IAppState} from '../../../../../redux/store';
import {CASES_CLEAR} from '../../../../../redux/cases/actions';
import {CasesService} from "../../../../../shared/services/cases.service";

@Component({
  selector: 'app-cases-dashboard',
  templateUrl: './cases-dashboard.component.html',
  styleUrls: ['./cases-dashboard.component.scss']
})
export class CasesDashboardComponent {

  @select(s => s.caseManagement.cases) cases;
  @select(s => s.caseManagement.lastUpdate) lastUpdate;

  /**
   * constructor
   *
   * @param {NgRedux<IAppState>} ngRedux
   * @param {CasesService} service
   */
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private service: CasesService
  ) {
  }

  /**
   * clearCases
   *
   */
  clearCases() {
    this.service.clearCases();
  }

}
