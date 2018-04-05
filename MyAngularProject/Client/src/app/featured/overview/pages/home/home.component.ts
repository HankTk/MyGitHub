import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../../../../sockets/websocket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  connection;
  data;

  /**
   * constructor
   *
   * @param {WebSocketService} webSocketService
   * @param {AuthenticationService} authenticationService
   */
  constructor(
    private webSocketService: WebSocketService,
  ) {
  }

  /**
   * ngOnInit
   *
   */
  ngOnInit() {

    // WebSocket - connect
    this.webSocketService.connect('hoge=hoge');
    this.connection = this.webSocketService.on('eventData').subscribe(data => {
      this.data = data;
    });

  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }

}
