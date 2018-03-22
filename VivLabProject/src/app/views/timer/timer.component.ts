import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-timer',
  template: '<p>Time: {{message}}</p>'
})
export class TimerComponent implements OnInit, OnDestroy {

  intervalId = 0;
  message = '';
  seconds = 0;

  clearTimer() {
    clearInterval(this.intervalId);
  }

  ngOnInit() {
    this.start();
  }

  ngOnDestroy() {
    this.clearTimer();
  }

  start() {
    this.countUp();
  }

  stop() {
    this.clearTimer();
    this.message = `${this.seconds}`;
  }

  reset() {
    this.seconds = 0;
  }

  private countUp() {
    this.clearTimer();
    this.intervalId = window.setInterval(() => {
      this.seconds++;
      this.message = `${this.seconds}`;
    }, 1000);
  }

}
