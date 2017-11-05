/**
 *  Product Data Service
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class ProductDataService {

  private products = [];
  private deployments = [];

  // Subject - products Changed
  private productsChanged = new Subject<void>();

  // Subject - products Load
  private productsLoaded: any = new Subject<void>();

  // Subject - deployments Changed
  private deploymentsChanged = new Subject<void>();

  // Subject - deployments Load
  private deploymentsLoaded: any = new Subject<void>();

  /**
   * constructor
   *
   * @param {HttpClient} httpClient
   */
  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * sendEventLoadProducts
   *
   * @param event
   */
  sendEventLoadProducts(event: any) {
    this.productsLoaded.next({ productsLoaded: event.productsLoaded });
  }

  /**
   * getEventLoadProducts
   *
   * @returns {Observable<any>}
   */
  getEventLoadProducts(): Observable<any> {
    return this.productsLoaded.asObservable();
  }

  /**
   * sendEventLoadDeployments
   *
   * @param event
   */
  sendEventLoadDeployments(event: any) {
    this.productsLoaded.next({ productsLoaded: event.productsLoaded });
  }

  /**
   * getEventLoadDeployments
   *
   * @returns {Observable<any>}
   */
  getEventLoadDeployments(): Observable<any> {
    return this.productsLoaded.asObservable();
  }

  /**
   * fetchProducts
   *
   */
  fetchProducts() {
    this.httpClient.get('/api/products')
      .map((response) => {
        const results = response;
        let products = [];
        if (results instanceof Array) {
          products = results.map((product) => {
            return product;
          });
        }
        return products;
      })
      .subscribe(
        (data) => {
          this.products = data;
          this.productsChanged.next();

          // Cases Updated
          this.sendEventLoadProducts({productsLoaded: 'ProductLoaded'});
        }
      );
  }

  /**
   * getProducts
   *
   * @returns {Array}
   */
  getProducts() {
    return this.products;
  }

  /**
   * fetchDeployments
   *
   */
  fetchDeployments() {
    this.httpClient.get('/api/deployment_methods')
      .map((response) => {
        const results = response;
        let deployments = [];
        if (results instanceof Array) {
          deployments = results.map((deployment) => {
            return deployment;
          });
        }
        return deployments;
      })
      .subscribe(
        (data) => {
          this.deployments = data;
          this.deploymentsChanged.next();

          // Cases Updated
          this.sendEventLoadDeployments({deploymentsLoaded: 'DeploymentLoaded'});
        }
      );
  }

  /**
   * getDeployments
   *
   * @returns {Array}
   */
  getDeployments() {
    return this.deployments;
  }

}
