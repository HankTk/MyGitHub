/**
 * ProductComponent
 *
 */
import {Component, OnInit} from '@angular/core';
import {Product} from '../../../models/product.model';
import {OrderItem} from '../../../models/orderitem.model';
import {OrderDataService} from '../../../services/orderData.service';
import {ProductDataService} from '../../../services/productData.service';

@Component({
  selector: 'mt-wizard-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  product: Product;

  totalAmount = 0;

  /**
   * constructor
   *
   * @param {OrderDataService} orderDataService
   * @param {ProductDataService} productDataService
   */
  constructor(
    private orderDataService: OrderDataService,
    private productDataService: ProductDataService
  ) {
  }

  /**
   * ngOnInit
   *
   */
  ngOnInit() {

    // Get Master Data
    this.productDataService.fetchProducts();
    this.productDataService.fetchDeployments();

    // Set Order Product
    this.product = this.orderDataService.getProduct();

    if (this.product.orderItems.length == 0) {
      let item = new OrderItem();
      this.product.orderItems.push(item);
    }

    // Calculate Total Amount
    this.calcTotalAmount();
  }

  /**
   * save
   *
   * @param form
   */
  save(form: any) {
    if (!form.valid)
      return;
    this.orderDataService.setProduct(this.product);
  }

  /**
   * calcTotalAmount
   *
   */
  calcTotalAmount() {
    let total = 0;
    for (let i = 0; i < this.product.orderItems.length; i++) {
      let item =  this.product.orderItems[i];
      total = total + (item.qty * item.listprice);
    }
    this.totalAmount = total;
  }

  /**
   * onClickAdd
   *
   */
  onClickAdd() {
    let item = new OrderItem();
    this.product.orderItems.push(item);

    // Calculate Total Amount
    this.calcTotalAmount();
  }

  /**
   * onItemChanged
   *
   */
  onItemChanged(event: any) {

    if (event.action == 'remove') {
      this.product.orderItems.splice(event.index, 1);
    }

    // Calculate Total Amount
    this.calcTotalAmount();
  }

}
