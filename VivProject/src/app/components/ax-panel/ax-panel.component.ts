import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'ax-panel',
  templateUrl: './ax-panel.component.html',
  styleUrls: ['./ax-panel.component.scss']
})
export class AxPanelComponent implements OnInit {

  @Input() axTitle: string = 'Panel title';
  @Input() axShowTitle: string = 'true';

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
