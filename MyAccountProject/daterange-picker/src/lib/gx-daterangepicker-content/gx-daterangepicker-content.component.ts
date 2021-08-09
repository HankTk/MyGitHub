import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  ViewChild,
  Output,
  EventEmitter,
  ViewChildren,
  QueryList,
  ElementRef,
  AfterViewInit,
  OnInit
} from '@angular/core';
import {MatDatepickerContent, MatCalendar, matDatepickerAnimations} from '@angular/material/datepicker';

import {GxDateRangePickerComponent} from './gx-daterangepicker/gx-daterangepicker.component';
import {GxDateRangeCalendarComponent} from './gx-daterangepicker/gx-calendar/gx-calendar.component';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'gx-daterangepicker-content',
  templateUrl: './gx-daterangepicker-content.component.html',
  styleUrls: ['./gx-daterangepicker-content.component.scss'],
  host: {
    'class': 'mat-datepicker-content',
    '[@transformPanel]': '"enter"',
    '[class.mat-datepicker-content-touch]': 'datepicker.touchUi',
    '[class.mat-datepicker-content-above]': '_isAbove',
    // '[class.mat-datepicker-range]': 'datepicker._range'
  },
  animations: [
    matDatepickerAnimations.transformPanel,
    matDatepickerAnimations.fadeInCalendar,
  ],
  exportAs: 'GxDatePickerContentComponent',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: ['color']
})
export class GxDaterangepickerContentComponent<D> extends MatDatepickerContent<D> implements OnInit, AfterViewInit
{

  @ViewChild(GxDateRangeCalendarComponent, {static: true}) _calendar: MatCalendar<D>;

  _onApplyRange = new EventEmitter()

  get drDatepicker(): GxDateRangePickerComponent<D> {
    return <any>this.datepicker;
  }

  setHoverCells = new BehaviorSubject<any>(null)
  clearBody = new BehaviorSubject<boolean>(null)

  @ViewChildren(GxDateRangeCalendarComponent) calendars: QueryList<GxDateRangeCalendarComponent<D>>

  ngOnInit()
  {
  }

  ngAfterViewInit()
  {
  }

  // THIS IS THE ONLY ADDITION
  onUserSelection(view): void
  {
    this.drDatepicker._userSelection();
  }

  applyRange(): void
  {
    if (this.drDatepicker.applyButton) {
      this.drDatepicker.applyRange();
    }
  }

  clearRange()
  {
    this.drDatepicker.clearRange();
    this.clearBody.next(true);
    this.datepicker._selected = null;
    this.drDatepicker._selectedRangeEnd = null;
  }

  setCustomRange(range)
  {
    if (!range.startDate || !range.endDate) return;
    this.datepicker._selected = range.startDate;
    this.drDatepicker._selectedRangeEnd = range.endDatel
    this.datepicker._selectedChanged.next(range.startDate);
    this.drDatepicker._selectedChangedRangeEnd.next(range.endDate);
    this.setActiveDate(range.startDate, range.endDate);
  }

  isSameRange(range)
  {
    if (!this.datepicker._selected || !this.drDatepicker._selectedRangeEnd || !range.startDate || !range.endDate) return;
    return this.drDatepicker._drDateAdapter.compareDate(range.startDate, this.datepicker._selected) == 0 &&
      this.drDatepicker._drDateAdapter.compareDate(range.endDate, this.drDatepicker._selectedRangeEnd) == 0
  }

  isSomeRange()
  {
    if (!this.datepicker._selected || !this.drDatepicker._selectedRangeEnd) return false;
    return this.drDatepicker.customRanges.some(range => this.isSameRange(range));
  }

  getWidthDateRangePicker()
  {
    if (this.drDatepicker.dualView) {
      if (this.drDatepicker.showCustomRanges && this.drDatepicker.customRanges.length) {
        return '680px';
      }
      return '600px';
    }
    if (this.drDatepicker.showCustomRanges && this.drDatepicker.customRanges.length) {
      return '450px';
    }
  }

  setActiveDate(from: D, to: D)
  {
    const fromMonth = this.drDatepicker._drDateAdapter.getMonth(from)
    const toMonth = this.drDatepicker._drDateAdapter.getMonth(to)

    const toYear = this.drDatepicker._drDateAdapter.getYear(to)
    const toDate = this.drDatepicker._drDateAdapter.getDate(to)

    let y;
    let m;
    if (toMonth === 11) {
      m = 0;
      y = toYear + 1;
    } else {
      m = toMonth + 1,
        y = toYear;
    }
    const endDate = this.drDatepicker._drDateAdapter.createDate(y, m, 1)

    this.calendars.forEach((calendar, i) => {
      if (i === 0) {
        calendar.activeDate = from;
      } else {
        if (fromMonth !== toMonth) { // if start month & end month are differents
          calendar.activeDate = to;
        } else {
          calendar.activeDate = endDate;
        }
      }
    });

  }

}
