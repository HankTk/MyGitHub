import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TileComponent } from '../tile/tile.component';
import { MessageEventService } from '../../services/messageEvent.service';

@Component({
  selector: 'app-minesweeper',
  templateUrl: './minesweeper.component.html',
  styleUrls: ['./minesweeper.component.scss']
})
export class MinesweeperComponent implements OnInit {

  @ViewChild('timer') timer;

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

    // Timer Reset/Start
    self.timer.reset();
    self.timer.start();
  }

  /**
   * createTilesTable
   *
   */
  createTilesTable() {
    const self = this;
    let ix = 0;
    let rowElement = [];
    for (let i = 0; i < this.tableSize; i++) {
      let colElement = [];
      for (let j = 0; j < this.tableSize; j++) {
        let tileObject = {
          index: ix,
          row: i,
          col: j,
          covered: true,
          hasMine: false,
          mineCount: 0,
          event: '',
          active: true,
          stateClass: 'covered'
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
      const ix = Math.floor(Math.random() * (this.tableSize * this.tableSize  - 1)) + 0;
      self.tilesArray[ix].hasMine = true;
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
      if (pseudoSlot.indexOf('a') > -1) pseudoSlot.splice(pseudoSlot.indexOf('a'), 1);
      if (pseudoSlot.indexOf('d') > -1) pseudoSlot.splice(pseudoSlot.indexOf('d'), 1);
      if (pseudoSlot.indexOf('f') > -1) pseudoSlot.splice(pseudoSlot.indexOf('f'), 1);
    }
    // last column
    if (position % this.tableSize === (this.tableSize  - 1)) {
      if (pseudoSlot.indexOf('c') > -1) pseudoSlot.splice(pseudoSlot.indexOf('c'), 1);
      if (pseudoSlot.indexOf('e') > -1) pseudoSlot.splice(pseudoSlot.indexOf('e'), 1);
      if (pseudoSlot.indexOf('h') > -1) pseudoSlot.splice(pseudoSlot.indexOf('h'), 1);
    }
    // first row
    if (position < (this.tableSize)) {
      if (pseudoSlot.indexOf('a') > -1) pseudoSlot.splice(pseudoSlot.indexOf('a'), 1);
      if (pseudoSlot.indexOf('b') > -1) pseudoSlot.splice(pseudoSlot.indexOf('b'), 1);
      if (pseudoSlot.indexOf('c') > -1) pseudoSlot.splice(pseudoSlot.indexOf('c'), 1);
    }
    // last row
    if (position >= (this.tableSize * (this.tableSize  - 1))) {
      if (pseudoSlot.indexOf('f') > -1) pseudoSlot.splice(pseudoSlot.indexOf('f'), 1);
      if (pseudoSlot.indexOf('g') > -1) pseudoSlot.splice(pseudoSlot.indexOf('g'), 1);
      if (pseudoSlot.indexOf('h') > -1) pseudoSlot.splice(pseudoSlot.indexOf('h'), 1);
    }

    let slot = [];
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
      if (self.calculateSlot(ix, parseInt(slot[i],0 ))) {
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

    // Check Has Won
    self.checkHasWon(event);

    // Check HasLose
    self.checkHasLose(event);

    // Check adjacent squares
    self.checkAdjacentSquares(event)
  }

  /**
   * checkHasWon
   *
   * @param event
   */
  checkHasWon(event) {
    const self = this;
    const filteredResult = self.tilesArray.filter(function(item, index, array) {
      return (!item.hasMine && !item.covered);
    });
    const totalTiles = self.tableSize * self.tableSize;
    const remainingTiles = totalTiles - filteredResult.length;
    if (remainingTiles === this.numberOfMines) {
      self.message = 'You won!';
    }
  }

  /**
   * checkHasLose
   *
   * @param event
   */
  checkHasLose(event) {
    const self = this;
    const filteredResult = self.tilesArray.filter(function(item, index, array) {
      return (item.hasMine && !item.covered);
    });
    if (filteredResult.length > 0) {
      self.message = 'You Lose!';

      // When hit mine
      if (event.event === 'mine-wrong') {

        // Stop Timer
        self.timer.stop();

        // Open remaining mines
        self.openRemaining();
      }
    }
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
      const slotIx = parseInt(slots[i]);
      const sx = event.index + slotIx;
      /*
      if (self.tilesArray[sx].covered) {
        self.messageEventService.sendEvent({name: 'around', index: sx});
      }
      */
      self.messageEventService.sendEvent({name: 'around', index: sx});
    }
  }

}
