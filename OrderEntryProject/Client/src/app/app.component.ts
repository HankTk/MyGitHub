/**
 * AppComponent
 *
 */
import {Component, OnInit, Input} from '@angular/core';
import {OrderDataService} from './services/orderData.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  title = 'Purchase Online';

  @Input() orderData;

  /**
   * constructor
   *
   * @param {OrderDataService} orderDataService
   */
  constructor(private orderDataService: OrderDataService) {
  }

  /**
   * ngOnInit
   *
   */
  ngOnInit() {
    this.orderData = this.orderDataService.getOrderData();
  }

}
