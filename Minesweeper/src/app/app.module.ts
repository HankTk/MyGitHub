import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import 'polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxElectronModule } from 'ngx-electron';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ElectronService } from './providers/electron.service';
import { WebviewDirective } from 'app/directives/webview.directive';

import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { PanelComponent } from './components/panel/panel.component';
import { MinesweeperComponent } from './views/minesweeper/minesweeper.component';
import { TileComponent } from './views/tile/tile.component';
import { TimerComponent } from './views/timer/timer.component';
import { MessageEventService } from './services/messageEvent.service';
import { OptionsComponent } from './views/options/options.component';
import { MenuService } from './services/menu.service';
import { CounterComponent } from './views/counter/counter.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({

  declarations: [
    AppComponent,
    HomeComponent,
    WebviewDirective,

    PanelComponent,

    MinesweeperComponent,
    TileComponent,
    TimerComponent,
    OptionsComponent,
    CounterComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    NgxElectronModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    })
  ],

  providers: [
    ElectronService,
    MessageEventService,
    MenuService
  ],

  bootstrap: [AppComponent],

  entryComponents: [TileComponent],

  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class AppModule { }
