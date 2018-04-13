/**
 * CaseListComponent
 *
 */
import {Component, OnInit} from '@angular/core';
import {NgRedux, select} from '@angular-redux/store';

import {CASES_ADD, CASES_UPDATE, CASES_REMOVE} from '../../../../../redux/cases/actions';
import {IAppState} from '../../../../../redux/store';
import {CasesService} from '../../../../../shared/services/cases.service';

@Component({
  selector: 'app-cases-list',
  templateUrl: './cases-list.component.html',
  styleUrls: ['./cases-list.component.scss']
})
export class CasesListComponent implements OnInit {

  @select(s => s.caseManagement.cases) cases;

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
   * ngOnInit
   *
   */
  ngOnInit() {
    this.service.loadCases();
  }

  /**
   * addCase
   *
   * @param input
   */
  addCase(input) {
    if (!input.value) {
      return;
    }
    const newObject = {
      title: input.value,
      isCompleted: false
    };

    this.service.addCase(newObject);
    input.value = '';
  }

  /**
   * removeCase
   *
   * @param cases
   */
  removeCase(cases) {
    this.service.removeCase(cases);
  }

  /**
   * updateCase
   *
   * @param cases
   */
  updateCase(cases) {
    cases.isCompleted = !cases.isCompleted;
    this.service.updateCase(cases);
  }

}
