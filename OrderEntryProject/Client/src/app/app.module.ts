/**
 * AppModule
 *
 */
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {UIRouterModule} from "@uirouter/angular";
import {FormsModule} from '@angular/forms';
import {BsDropdownModule} from 'ngx-bootstrap';

/* App Root */
import {AppComponent} from './app.component';
import {NavbarComponent} from './views/components/navbar/navbar.component';

/* Feature Components */
import {ProductComponent} from './views/wizard/product/product.component';
import {BillingComponent} from './views/wizard/billing/billing.component';
import {OrderItemComponent} from './views/wizard/product/order-item/order-item.component';

/* App Router */
import {UIRouterConfigFn} from "./app.router";
import {AppStates} from "./app.states";

/* Shared Service */
import {OrderDataService} from './services/orderData.service';
import {WorkflowService} from './workflow/workflow.service';
import {ProductDataService} from './services/productData.service';

/**
 * NgModule
 *
 */
@NgModule({

  /**
   * imports
   */
  imports: [BrowserModule,
    FormsModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    UIRouterModule.forRoot({
      states: AppStates,
      useHash: true,
      config: UIRouterConfigFn
    })
  ],

  /**
   * providers
   */
  providers: [
    OrderDataService,
    WorkflowService,
    ProductDataService
  ],

  /**
   * declarations
   */
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductComponent,
    BillingComponent,
    OrderItemComponent
  ],

  /**
   * bootstrap
   */
  bootstrap: [AppComponent]

})

export class AppModule {
}
