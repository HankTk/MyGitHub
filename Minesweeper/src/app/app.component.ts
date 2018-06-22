import { Component } from '@angular/core';
import { ElectronService } from './providers/electron.service';
import { TranslateService } from '@ngx-translate/core';
import { dialog, remote, ipcRenderer, BrowserWindow } from 'electron';
import { MenuService } from './services/menu.service';
const Menu = remote.Menu;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  /**
   * constructor
   *
   * @param {ElectronService} electronService
   * @param {TranslateService} translate
   * @param {MenuService} menuService
   */
  constructor (
    public electronService: ElectronService,
    private translate: TranslateService,
    private menuService: MenuService
  ) {

    const self = this;

    translate.setDefaultLang('en');

    if (electronService.isElectron()) {

      console.log('Mode electron');

      // Check if electron is correctly injected (see externals in webpack.config.js)
      console.log('c', electronService.ipcRenderer);

      // Check if nodeJs childProcess is correctly injected (see externals in webpack.config.js)
      console.log('c', electronService.childProcess);

    } else {
      console.log('Mode web');
    }

    // Create Menu
    /*
    const template = [
      {
        label: 'Minesweeper',
        submenu: [
          {
            label: 'Options',
            click: function() {
              self.openOptionsWindow();
            }
          },
        ]
      }
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
    */
  }

  /**
   * openOptionsWindow
   *
   */
  openOptionsWindow () {
    this.menuService.sendEventSelected('test');
  }

}
