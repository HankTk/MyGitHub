import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

  @Input() axTitle = 'Panel title';
  @Input() axShowTitle = 'true';

  /**
   * constructor
   *
   */
  constructor() {
  }

  /**
   * ngOnInit
   *
   */
  ngOnInit() {
  }

}
