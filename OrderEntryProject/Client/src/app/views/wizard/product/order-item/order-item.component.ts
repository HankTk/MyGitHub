/**
 * OrderItemComponent
 *
 */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OrderItem } from "../../../../models/orderitem.model";
import { ProductDataService } from '../../../../services/productData.service';
import * as _ from "lodash";

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit {

  @Input() item:OrderItem;
  @Input() index;
  @Output() onItemChanged = new EventEmitter<any>();

  form_product: string = '(Select)';
  form_deployment: string = '(Select)';
  form_model: string = '(Select)';
  isProductSelected: boolean = false;

  // Products
  products = [];

  // Deployments
  deployments = [];

  // Models
  models = [];

  /**
   * constructor
   *
   */
  constructor(
    private productDataService: ProductDataService
  ) {

    // Product Loaded
    this.productDataService.getEventLoadProducts().subscribe(event => {
      // Refresh Products List
      this.updateProductsList();
    });

    // Deployment Loaded
    this.productDataService.getEventLoadDeployments().subscribe(event => {
      // Refresh Deployment List
      this.updateDeploymentsList();
    });

  }

  /**
   * ngOnInit
   *
   */
  ngOnInit() {
    // Update Product List
    this.products = this.productDataService.getProducts();

    // Update Deployment List
    this.deployments = this.productDataService.getDeployments();
  }

  /**
   * updateProductsList
   *
   */
  updateProductsList() {
    // Update Product List
    this.products = this.productDataService.getProducts();
    if (this.item.product !== '') {
      let selectedItem = _.find(this.products, {product_name:this.item.product});
      this.onSelectProduct(selectedItem);

      // Restor Product Name
      this.form_product = (this.item.product === '') ? '(Select)' : this.item.product;
    }
  }

  /**
   * updateDeploymentsList
   *
   */
  updateDeploymentsList() {
    // Update Deployment List
    this.deployments = this.productDataService.getDeployments();
    if (this.item.product !== '') {
      let selectedItem = _.find(this.deployments, {deployment_name:this.item.deploy});
      this.onSelectDeployment(selectedItem);

      // Restor Deployment Name
      this.form_deployment = (this.item.deploy === '') ? '(Select)' : this.item.deploy;
    }
  }

  /**
   * onSelectProduct
   *
   * @param selectedItem
   */
  onSelectProduct(selectedItem: any) {
    // Reset, qty and price
    if (this.item.product !== selectedItem.product_name) {
      this.restQtyPrice();
    }

    // Set Product
    this.form_product = selectedItem.product_name;

    // Save product to model
    this.item.product = selectedItem.product_name;

    // Set Models, based on selected product and filter by deployment
    this.setModel(null);
  }

  /**
   * onSelectDeployment
   *
   * @param selectedItem
   */
  onSelectDeployment(selectedItem: any) {
    // Reset, qty and price
    if (this.item.deploy !== selectedItem.deployment_name) {
      this.restQtyPrice();
    }

    // Set Deployment
    this.form_deployment = selectedItem.deployment_name;

    // Save product to model
    this.item.deploy = selectedItem.deployment_name;

    // Set Models, based on selected product and filter by deployment
    this.setModel(selectedItem);
  }

  /**
   * onSelectModel
   *
   * @param selectedItem
   */
  onSelectModel(selectedItem: any) {
    // Reset, qty and price
    if (this.item.model !== selectedItem.model_name) {
      this.restQtyPrice();
    }

    // Set Model
    this.form_model = selectedItem.model_name;

    // Save product to model
    this.item.model = selectedItem.model_name;

    // Update line item listprice
    this.item.listprice = selectedItem.model_price;

    // emit event
    this.onItemChanged.emit({action: 'price', index: this.index});
  }

  /**
   * onChangeQty
   */
  onChangeQty(event:any) {
    // Update line item qty
    this.item.qty = event.target.value;

    // emit event
    this.onItemChanged.emit({action: 'qty', index: this.index});
  }

  /**
   * onClickRemove
   */
  onClickRemove() {
    // emit event
    this.onItemChanged.emit({action: 'remove', index: this.index});
  }

  /**
   * setModel
   *
   * @param {string} deployment
   */
  setModel(deployment: any) {
    // initialize models
    this.models = [];
    this.form_model = '(Select)';

    // Filter models by selected deployment id
    let selectedProduct = _.find(this.products, {product_name:this.item.product});
    let models = selectedProduct.product_models;
    let modelId = (deployment == null) ? null : deployment.deployment_id;

    // Filter models by selected deployment id
    this.models = models
      .filter(
        (aModel) => {
          return (
            (aModel.deployment_id === modelId)
          );
        }
      );

    // Set model field default value
    if (this.models.length > 0) {
      // Check current model is available in model list or not
      let selectedModel = _.find(this.models, {model_name: this.item.model});
      this.form_model = (selectedModel) ? this.item.model : '(Select)';
      this.isProductSelected = true;
    }
    else {
      this.form_model = '(Model is not available)';
      this.isProductSelected = false;

      // When deployment is not null, clear item model
      if (deployment !== null) {
        this.item.model = '';
      }
    }
  }

  /**
   * restQtyPrice
   *
   */
  restQtyPrice() {
    this.item.qty = 1;
    this.item.listprice = 0;
  }

}
