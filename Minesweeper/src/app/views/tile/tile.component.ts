import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { MessageEventService } from '../../services/messageEvent.service';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent implements OnInit, OnDestroy, OnChanges {

  @Input('tile') tile;
  @Output() onOpened = new EventEmitter<boolean>();
  @Output() onFlagged = new EventEmitter<boolean>();

  /**
   * constructor
   *
   */
  constructor(
    private messageEventService: MessageEventService
  ) {
    const self = this;
    self.messageEventService.varSubject.subscribe(event => {
      if (event.name === 'over') {
        self.updateState();
      } else if (event.name === 'around') {
        self.updateAround(event);
      }
    });
  }

  /**
   * Angular Lifecycle Hooks: OnInit
   */
  ngOnInit(): void {
    const self = this;
    /*
    self.stateClass = 'blank';
    */
  }

  /**
   * Angular Lifecycle Hooks: OnDestroy
   */
  ngOnDestroy(): void {
  }

  /**
   * ngOnChanges
   *
   */
  ngOnChanges() {
    const self = this;
  }

  /**
   * onClick
   *
   */
  onClick() {
    const self = this;

    // if tile is not active
    if (!self.tile.active) {
      return;
    }

    // Set State
    self.setState();
  }

  /**
   * onRightClick
   *
   * @returns {boolean}
   */
  onRightClick(event) {
    const self = this;

    // if tile is not active
    if (!self.tile.active) {
      return;
    }

    // When tile is already opened
    if (!self.tile.blank) {
      return;
    }

    if (self.tile.stateClass !== 'bombflagged') {
      self.tile.stateClass = 'bombflagged';
    } else {
      self.tile.stateClass = 'blank';
    }
    self.onFlagged.emit(self.tile);
  }

  /**
   * onClick
   *
   */
  setState() {
    const self = this;

    // Set Covered false
    self.tile.blank = false;

    // When tile has mine
    if (self.tile.hasMine) {
      self.tile.stateClass = 'bombdeath';

      // emit event
      self.tile.event = 'bombdeath';
      self.onOpened.emit(self.tile);
      return;
    }

    // When tile has number
    if (self.tile.mineCount > 0) {
      self.tile.stateClass = 'open' + this.tile.mineCount;
      self.tile.event = 'number';
      self.onOpened.emit(self.tile);
      return;
    }

    // Set open0
    self.tile.event = 'open0';
    self.onOpened.emit(self.tile);
    self.tile.stateClass = 'open0';
  }

  /**
   * updateState
   *
   */
  updateState() {
    const self = this;
    if (!self.tile.active && self.tile.hasMine && self.tile.blank) {
      self.tile.stateClass = 'mine';
      self.tile.blank = false;
    }
  }

  /**
   * updateAround
   *
   */
  updateAround(event) {
    const self = this;
    const index = event.index;

    // When tile index is not match
    if (self.tile.index !== index) {
      return;
    }

    // When tile has Mine
    if (self.tile.hasMine) {
      return;
    }

    // When tile is already opened
    if (!self.tile.blank) {
      return;
    }

    // When tile is flagged
    if (self.tile.stateClass === 'bombflagged') {
      return;
    }

    // Set Covered false
    self.tile.blank = false;

    // When tile has number
    if (self.tile.mineCount > 0) {
      self.tile.stateClass = 'open' + this.tile.mineCount;
      self.tile.event = 'number';
    } else {
      // Set open0
      self.tile.event = 'open0';
      self.tile.stateClass = 'open0';

      // Send event as opened
      self.onOpened.emit(self.tile);
    }
  }

}
