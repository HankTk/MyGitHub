import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TileComponent } from '../tile/tile.component';
import { MessageEventService } from '../../services/messageEvent.service';
import { remote } from 'electron';

@Component({
  selector: 'app-minesweeper',
  templateUrl: './minesweeper.component.html',
  styleUrls: ['./minesweeper.component.scss']
})
export class MinesweeperComponent implements OnInit {

  @ViewChild('timer') timer;
  @ViewChild('counter') counter;

  // Table Size
  public tableSize = 9;
  public numberOfMines = 10;

  // Square, Width and Height
  public tableWidth = (this.tableSize * 24) + 'px';
  public tableHeight = (this.tableSize * 24) + 'px';

  // Tiles
  public tilesMatrix = [];
  public tilesArray = [];

  // Message
  public message = '';

  private timerStarted = false;

  public stateClass = 'facesmile';

  /**
   * constructor
   *
   * @param {ElementRef} elRef
   * @param {MessageEventService} messageEventService
   */
  constructor(
    private elRef: ElementRef,
    private messageEventService: MessageEventService
  ) {}

  /**
   * ngOnInit
   *
   */
  ngOnInit() {

    const self = this;

    // Initialize
    self.initialize();
  }

  /**
   * onClickNewGame
   *
   */
  onClickNewGame() {
    const self = this;

    // Initialize
    self.initialize();
  }

  /**
   * initialize
   *
   */
  initialize() {

    const self = this;

    self.stateClass = 'facesmile';

    // Initialize
    self.resetTilesTable();

    // Create Tiles
    self.createTilesTable();

    // Add Mines
    self.addMines();

    // Calculate Mine Numbers
    self.calculateAllNumbers();
  }

  /**
   * resetTilesTable
   *
   */
  resetTilesTable() {
    const self = this;

    // Table size
    self.tableWidth = (this.tableSize * 24) + 'px';
    self.tableHeight = (this.tableSize * 24) + 'px';

    // Initialize message area
    self.message = '';
    self.tilesMatrix = [];
    self.tilesArray = [];

    // Counter Reset/Start
    self.counter.reset();
    /*
    self.counter.setNumber(this.numberOfMines);
    */

    // Timer Reset/Start
    self.timer.reset();
    self.timer.stop();
    self.timerStarted = false;

    // Set Window Size
    const win = remote.getCurrentWindow();
    win.setBounds( {
      x: 300, y: 200,
      width: (this.tableSize * 24) + 26,
      height: (this.tableSize * 24) + 88,
    });
  }

  /**
   * createTilesTable
   *
   */
  createTilesTable() {
    const self = this;
    let ix = 0;
    const rowElement = [];
    for (let i = 0; i < this.tableSize; i++) {
      const colElement = [];
      for (let j = 0; j < this.tableSize; j++) {
        const tileObject = {
          index: ix,
          row: i,
          col: j,
          blank: true,
          hasMine: false,
          mineCount: 0,
          event: '',
          active: true,
          stateClass: 'blank'
        };
        colElement.push(tileObject);
        self.tilesArray.push(tileObject);
        ix++;
      }
      rowElement.push(colElement);
    }
    self.tilesMatrix = rowElement;
  }

  /**
   * addMines
   *
   */
  addMines() {
    const self = this;
    for (let i = 0; i < self.numberOfMines; i++) {
      let isAssigned = false;
      while (!isAssigned) {
        const ix = Math.floor(Math.random() * (this.tableSize * this.tableSize  - 1)) + 1;
        if (!self.tilesArray[ix].hasMine) {
          self.tilesArray[ix].hasMine = true;
          isAssigned = true;
        }
      }
    }
  }

  /**
   * calculateAllNumbers
   *
   */
  calculateAllNumbers() {
    const self = this;
    for (let i = 0; i < (this.tableSize * this.tableSize  - 1); i++) {
      if (!self.tilesArray[i].hasMine) {
        self.tilesArray[i].mineCount = self.calculateNumber(i);
      }
    }
  }

  /**
   * getSlots
   *
   */
  getSlots(position) {
    const self = this;
    const pseudoSlot = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const mapping = {
      'a': 0 - this.tableSize - 1,
      'b': 0 - this.tableSize,
      'c': 0 - this.tableSize + 1,
      'd':  -1,
      'e':  +1,
      'f': 0 + this.tableSize - 1,
      'g': 0 + this.tableSize,
      'h': 0 + this.tableSize + 1
    };

    // first column
    if (position % this.tableSize === 0) {
      if (pseudoSlot.indexOf('a') > -1) { pseudoSlot.splice(pseudoSlot.indexOf('a'), 1) }
      if (pseudoSlot.indexOf('d') > -1) { pseudoSlot.splice(pseudoSlot.indexOf('d'), 1) }
      if (pseudoSlot.indexOf('f') > -1) { pseudoSlot.splice(pseudoSlot.indexOf('f'), 1) }
    }
    // last column
    if (position % this.tableSize === (this.tableSize  - 1)) {
      if (pseudoSlot.indexOf('c') > -1) { pseudoSlot.splice(pseudoSlot.indexOf('c'), 1) }
      if (pseudoSlot.indexOf('e') > -1) { pseudoSlot.splice(pseudoSlot.indexOf('e'), 1) }
      if (pseudoSlot.indexOf('h') > -1) { pseudoSlot.splice(pseudoSlot.indexOf('h'), 1) }
    }
    // first row
    if (position < (this.tableSize)) {
      if (pseudoSlot.indexOf('a') > -1) { pseudoSlot.splice(pseudoSlot.indexOf('a'), 1) }
      if (pseudoSlot.indexOf('b') > -1) { pseudoSlot.splice(pseudoSlot.indexOf('b'), 1) }
      if (pseudoSlot.indexOf('c') > -1) { pseudoSlot.splice(pseudoSlot.indexOf('c'), 1) }
    }
    // last row
    if (position >= (this.tableSize * (this.tableSize  - 1))) {
      if (pseudoSlot.indexOf('f') > -1) { pseudoSlot.splice(pseudoSlot.indexOf('f'), 1) }
      if (pseudoSlot.indexOf('g') > -1) { pseudoSlot.splice(pseudoSlot.indexOf('g'), 1) }
      if (pseudoSlot.indexOf('h') > -1) { pseudoSlot.splice(pseudoSlot.indexOf('h'), 1) }
    }

    const slot = [];
    for (let i = 0; i < pseudoSlot.length; i++) {
      const x = pseudoSlot[i];
      const v = mapping[x];
      slot.push(v);
    }
/*
console.log(slot);
*/
    // Return
    return slot;
  }

  /**
   * calculateNumber
   *
   */
  calculateNumber(ix) {
    const self = this;
    const slot = self.getSlots(ix);

    // Calculate count
    let count = 0;
    for (let i = 0; i < slot.length; i++) {
      if (self.calculateSlot(ix, parseInt(slot[i], 0 ))) {
        count++;
      }
    }
    return count;
  }

  /**
   * calculateSlot
   *
   */
  calculateSlot(ix, slot) {
    const self = this;
    const min = 0, max = (this.tableSize * this.tableSize  - 1);
    if ( ((ix + (slot)) >= min) && ((ix + (slot)) <= max)) {
      if ((self.tilesArray[ix + (slot)]).hasMine) {
        return true;
      }
    }
    return false;
  }

  /**
   * onOpened
   *
   * @param event
   */
  onOpened(event: any) {
    const self = this;

    if (!self.timerStarted) {
      self.timer.start();
      self.timerStarted = true;
      self.stateClass = 'faceclock';
    }

    // Check Has Won
    if (self.checkHasWon(event))
      return;

    // Check HasLose
    if (self.checkHasLose(event))
      return;

    // Check adjacent squares
    self.checkAdjacentSquares(event)
  }

  /**
   * onFlagged
   *
   * @param event
   */
  onFlagged(event: any) {
    const self = this;

    // Check Has Won
    if (event.stateClass === 'bombflagged') {
      self.counter.countUp();
    } else {
      self.counter.countDown();
    }
  }

  /**
   * checkHasWon
   *
   * @param event
   */
  checkHasWon(event) {
    const self = this;
    const filteredResult = self.tilesArray.filter(function(item, index, array) {
      return (!item.hasMine && !item.blank);
    });
    const totalTiles = self.tableSize * self.tableSize;
    const remainingTiles = totalTiles - filteredResult.length;
    if (remainingTiles === this.numberOfMines) {
      self.message = 'You won!';
      self.stateClass = 'facewin';

      // Stop Timer
      self.timer.stop();
      return true;
    }
    return false;
  }

  /**
   * checkHasLose
   *
   * @param event
   */
  checkHasLose(event) {
    const self = this;
    const filteredResult = self.tilesArray.filter(function(item, index, array) {
      return (item.hasMine && !item.blank);
    });
    if (filteredResult.length > 0) {
      self.message = 'You Lose!';
      self.stateClass = 'facedead';


      // When hit mine
      if (event.event === 'bombdeath') {

        // Stop Timer
        self.timer.stop();

        // Open remaining mines
        self.openRemaining();

        return true;
      }
    }
    return false;
  }

  /**
   * openRemaining
   *
   */
  openRemaining() {
    const self = this;

    // Set active false
    for (let i = 0; i < self.tilesArray.length; i++) {
      self.tilesArray[i].active = false;
    }

    // Emit event
    self.messageEventService.sendEvent({name: 'over'})
  }

  /**
   * checkAdjacentSquares
   *
   */
  checkAdjacentSquares(event) {
    const self = this;
    const slots = self.getSlots(event.index);
    for (let i = 0; i < slots.length; i++) {
      const slotIx = parseInt(slots[i], 0);
      const sx = event.index + slotIx;
      /*
      if (self.tilesArray[sx].blank) {
        self.messageEventService.sendEvent({name: 'around', index: sx});
      }
      */
      self.messageEventService.sendEvent({name: 'around', index: sx});
    }
  }

  /**
   * onSaveOptions
   *
   * @param event
   */
  onSaveOptions(event) {
    const self = this;
    // Initialize
    self.initialize();
  }

}
