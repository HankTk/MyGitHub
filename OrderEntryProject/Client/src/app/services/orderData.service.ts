/**
 * OrderDataService
 *
 */
import {Injectable} from '@angular/core';
import {OrderData} from '../models/order.model';
import {Billing} from '../models/billing.model';
import {Product} from '../models/product.model';
import {WorkflowService} from '../workflow/workflow.service';
import {STEPS} from '../workflow/workflow.model';

@Injectable()
export class OrderDataService {

  private orderData: OrderData = new OrderData();
  private isProductFormValid: boolean = false;
  private isBillingFormValid: boolean = false;

  /**
   * constructor
   *
   * @param {WorkflowService} workflowService
   */
  constructor(
    private workflowService: WorkflowService
  ) {
  }

  /**
   * getProduct
   *
   * @returns {Product}
   */
  getProduct(): Product {
    // Return the Product data
    let product: Product = {
      orderItems: this.orderData.orderItems
    };
    return product;
  }

  /**
   * setProduct
   *
   * @param {Product} data
   */
  setProduct(data: Product) {
    // Update the Product data only when the Product Form had been validated successfully
    this.isProductFormValid = true;
    this.orderData.orderItems = data.orderItems;

    // Validate Product Step in Workflow
    this.workflowService.validateStep(STEPS.product);
  }

  /**
   * getBilling
   *
   * @returns {Billing}
   */
  getBilling(): Billing {
    // Return the Billing data
    let billing: Billing = {
      // Customer Information
      firstName: this.orderData.firstName,
      lastName: this.orderData.lastName,
      email: this.orderData.email,

      // Billing Address
      street: this.orderData.street,
      city: this.orderData.city,
      state: this.orderData.state,
      zip: this.orderData.zip
    };
    return billing;
  }

  /**
   * setBilling
   *
   * @param {Billing} data
   */
  setBilling(data: Billing) {
    // Update the Billing data only when the Billing Form had been validated successfully

    this.isBillingFormValid = true;

    // Customer Information
    this.orderData.firstName = data.firstName;
    this.orderData.lastName = data.lastName;
    this.orderData.email = data.email;

    // Billing Address
    this.orderData.street = data.street;
    this.orderData.city = data.city;
    this.orderData.state = data.state;
    this.orderData.zip = data.zip;
    // Validate Billing Step in Workflow
    this.workflowService.validateStep(STEPS.billing);
  }

  /**
   * getOrderData
   *
   * @returns {OrderData}
   */
  getOrderData(): OrderData {
    // Return the entire Form Data
    return this.orderData;
  }

}
