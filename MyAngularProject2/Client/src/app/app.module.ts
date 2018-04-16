/**
 * AppModule
 *
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import {
  NgRedux,
  NgReduxModule,
  DevToolsExtension
} from '@angular-redux/store';
import { WebSocketService } from './sockets/websocket.service';
import { ToastyModule } from 'ng2-toasty';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { IAppState, rootReducer, INITIAL_STATE } from './redux/store';

import { AuthenticationService } from './shared/services/Authentication.service';
import { AuthInterceptorService } from './shared/services/AuthInterceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginPageComponent } from './featured/authentication/pages/login/login.page';
import { LogoutComponent } from './featured/authentication/components/logout/logout.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { AuthGuard } from './shared/guards/authGuard.guard';
import { AppPreloadingStrategy } from './shared/strategies/appLoading.strategy';

/**
 * AppModule - NgModule
 *
 */
@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    LogoutComponent,
    HeaderComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgReduxModule,
    ToastyModule,
    NgbModule.forRoot(),
    ServiceWorkerModule.register('/ngsw-worker.js', {
      enabled: environment.production
    })
  ],

  providers: [
    WebSocketService,
    AuthenticationService,
    AuthGuard,
    AppPreloadingStrategy,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],

  bootstrap: [AppComponent]
})

/**
 * AppModule
 *
 */
export class AppModule {
  /*
  constructor(ngRedux: NgRedux<IAppState>) {
    ngRedux.configureStore(rootReducer, INITIAL_STATE);
  }
  */
  constructor(ngRedux: NgRedux<any>) {
    ngRedux.configureStore(rootReducer, INITIAL_STATE);
  }
}
