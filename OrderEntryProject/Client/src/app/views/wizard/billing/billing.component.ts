/**
 * BillingComponent
 *
 */
import {Component, OnInit} from '@angular/core';
/*
import {Product} from '../../../models/product.model';
*/
import {Billing} from '../../../models/billing.model';
import {OrderDataService} from '../../../services/orderData.service';

@Component({
  selector: 'mt-wizard-billing',
  templateUrl: './billing.component.html'
})
export class BillingComponent implements OnInit {

  billing: Billing;

  /**
   * constructor
   *
   * @param {OrderDataService} orderDataService
   */
  constructor(
    private orderDataService: OrderDataService
  ) {
  }

  /**
   * ngOnInit
   *
   */
  ngOnInit() {
    this.billing = this.orderDataService.getBilling();
  }

  /**
   * save
   *
   * @param form
   */
  save(form: any) {
    /* HT:9/27/17... Should check this condition. Commented out for demo.
    if (!form.valid)
      return;
    */

    // Set Billing
    this.orderDataService.setBilling(this.billing);
  }

}
