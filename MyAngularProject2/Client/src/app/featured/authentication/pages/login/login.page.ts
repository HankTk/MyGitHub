/**
 *
 * LoginPageComponent
 *
 */
import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {
  ToastyService,
  ToastyConfig,
  ToastOptions,
  ToastData
} from 'ng2-toasty';
import { Subscription } from 'rxjs/Subscription';
import { AuthenticationService } from '../../../../shared/services/Authentication.service';

/*
import Cookies from 'cookies-js';
import { CommonService } from '../commonutil/common.service';
import { preventBrowserBack } from '../home/prevent-browser_back';
*/

import { LoginService } from './../../services/login.service';
import { LoginModel } from './../../models/login.model';
import { WebSocketService } from '../../../../sockets/websocket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [LoginService]
})
export class LoginPageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('user') user;
  @ViewChild('userEmailId') userEmailId;

  public submitted: boolean;
  public loginDetails: LoginModel;
  public infomessage: string;
  public show: boolean;
  public loading = false;
  public loginMsg: string;
  public title: string;
  private subscription: Subscription = new Subscription();
  public appEnvironment: string;

  // WebSocket
  private connection;
  private data;

  /**
   * constructor
   *
   * @param {WebSocketService} webSocketService
   * @param {AuthenticationService} authenticationService
   * @param {LoginService} loginService
   * @param {NgbModal} modalService
   * @param {Router} router
   * @param {ToastyService} toastyService
   * @param {ToastyConfig} toastyConfig
   */
  constructor(
    private webSocketService: WebSocketService,
    private authenticationService: AuthenticationService,
    private loginService: LoginService,
    private modalService: NgbModal,
    /*
    private commonService: CommonService,
    */
    private router: Router,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig
  ) {
    this.loginDetails = new LoginModel();
    this.show = false;
    /*
    preventBrowserBack.preventBack();
    */
  }

  /**
   * ngOnInit
   *
   */
  ngOnInit() {
    this.infomessage = '';

    // Get Env Information
    this.getAppEnvironment();

    // resets cookies
    /*
    Cookies.set('securityToken', undefined);
    Cookies.set('loginTime', undefined);
    Cookies.set('userId', undefined);
    */
    this.authenticationService.logout();
  }

  /**
   * ngAfterViewInit
   *
   */
  ngAfterViewInit() {
    this.user.nativeElement.focus();
  }

  /**
   * open
   *
   * @param content
   */
  open(content) {
    this.modalService
      .open(content, { windowClass: 'modal-main' })
      .result.then(result => {}, reason => {});
  }

  /**
   * passwordReset
   *
   * @param userEmailId
   */
  passwordReset(userEmailId) {
    if (userEmailId.validity.valid) {
      const data = userEmailId.value;
      if (data.slice(0, 1) === '.' || Number(data.slice(0, 1))) {
        const toastSuccessOptions: ToastOptions = {
          title: '',
          msg: 'Please provide a valid email address',
          showClose: true,
          theme: 'material'
        };
        this.toastyService.info(toastSuccessOptions);
      } else {
        this.subscription.add(
          this.loginService.passwordRedirect(userEmailId.value).subscribe(
            response => {
              if (response.message) {
                this.infomessage = response.message;
                const toastSuccessOptions: ToastOptions = {
                  title: '',
                  msg: this.infomessage,
                  showClose: true,
                  theme: 'material'
                };
                this.toastyService.info(toastSuccessOptions);
              }
            },
            err => {
              console.log('Error occured.' + err);
            }
          )
        );
      }
    } else {
      const toastSuccessOptions: ToastOptions = {
        title: '',
        msg: 'Please provide a valid email address',
        showClose: true,
        theme: 'material'
      };
      this.toastyService.info(toastSuccessOptions);
    }
  }

  /**
   * hideDiv
   *
   */
  hideDiv() {
    this.show = false;
  }

  /**
   * getAppEnvironment
   *
   */
  getAppEnvironment() {
    this.subscription.add(
      this.loginService.appEnvironment().subscribe(response => {
        this.appEnvironment = response.data;
      })
    );
  }

  /**
   * ngOnDestroy
   *
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /**
   * onClickLogin
   *
   */
  login(form) {
    const self = this;
    if (form.invalid) {
      return;
    }

    // Login - Get Token
    const username = form.username;
    const password = form.password;
    this.authenticationService.login(
      username,
      password,
      self.loginSuccessHandler.bind(self),
      self.loginFailureHandler.bind(self)
    );
  }

  /**
   * loginSuccessHandler
   *
   */
  loginSuccessHandler(res) {
    // WebSocket - connect
    this.webSocketService.connect('hoge=hoge');
    this.connection = this.webSocketService.on('eventData').subscribe(data => {
      this.data = data;
    });

    // Route to Overview Page
    this.router.navigate(['fleet']);
  }

  /**
   * loginFailureHandler
   *
   */
  loginFailureHandler(err) {
    this.show = true;
    if (!err.error.message) {
      this.loginMsg =
        'An error occurred while attempting to contact the server.';
    } else {
      this.loginMsg = err.error.message;
    }
  }
}
