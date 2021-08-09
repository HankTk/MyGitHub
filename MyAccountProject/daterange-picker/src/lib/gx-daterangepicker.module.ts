import {ComponentFactoryResolver, Injector, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {A11yModule} from '@angular/cdk/a11y';
import {OverlayModule} from '@angular/cdk/overlay';
import {PortalModule} from '@angular/cdk/portal';
import {MatNativeDateModule} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';

import {
  MatDatepickerModule,
  MatDatepicker,
  MatDatepickerToggle,
  MatDatepickerContent,
  MatCalendar,
  MatMonthView,
  MatCalendarBody
} from '@angular/material/datepicker';

import {GxDateRangePickerComponent} from './gx-daterangepicker-content/gx-daterangepicker/gx-daterangepicker.component';
import {GxDateRangePickerInputDirective} from './gx-daterangepicker-content/gx-daterangepicker/gx-calendar-common/gx-calendar-input.directive';
import {GxDaterangepickerContentComponent} from './gx-daterangepicker-content/gx-daterangepicker-content.component';
import {GxDateRangeCalendarComponent} from './gx-daterangepicker-content/gx-daterangepicker/gx-calendar/gx-calendar.component';
import {GxDateRangeMonthViewComponent} from './gx-daterangepicker-content/gx-daterangepicker/gx-calendar-month/gx-calendar-month.component';
import {GxDateRangeCalendarBodyComponent} from './gx-daterangepicker-content/gx-daterangepicker/gx-calendar-body/gx-calendar-body.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    A11yModule,
    PortalModule,
    OverlayModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  declarations: [
    GxDateRangePickerComponent,
    GxDateRangePickerInputDirective,
    GxDaterangepickerContentComponent,
    GxDateRangeCalendarComponent,
    GxDateRangeMonthViewComponent,
    GxDateRangeCalendarBodyComponent
  ],
  exports: [
    GxDateRangePickerComponent,
    GxDateRangePickerInputDirective,
    GxDaterangepickerContentComponent
  ],
  entryComponents: [
    GxDaterangepickerContentComponent
  ]
})
export class GxDaterangepickerModule {
  constructor(cf: ComponentFactoryResolver, injector: Injector) {
    // this is a workaround to ensure CSS/HTML from mat datepicker is loaded, otherwise it is omitted.
    cf.resolveComponentFactory(MatDatepicker).create(injector);
    cf.resolveComponentFactory(MatDatepickerContent).create(injector);
    cf.resolveComponentFactory(MatCalendar).create(injector);
    cf.resolveComponentFactory(MatMonthView).create(injector);
    cf.resolveComponentFactory(MatCalendarBody).create(injector);
    cf.resolveComponentFactory(MatDatepickerToggle).create(injector);
  }
}
