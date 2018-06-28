import { Component } from '@angular/core';
import { AlertController, Events, ModalController, NavController, Platform, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FormBuilder, Validators } from '@angular/forms';
import { FindPasswordPage } from './find-password/find-password';
import { RegisterPage } from './register/register';
import { GlobalData } from '../../providers/GlobalData';
import { CommonService } from '../../service/CommonService';
import { Helper } from '../../providers/Helper';
import { UserInfo } from '../../model/UserInfo';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  submitted = false;
  loginForm: any;

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              public formBuilder: FormBuilder,
              public storage: Storage,
              public events: Events,
              public globalData: GlobalData,
              public modalCtrl: ModalController,
              public platform: Platform,
              public alertCtrl: AlertController,
              public helper: Helper,
              public commonService: CommonService) {
    this.loginForm = this.formBuilder.group({
      username: [this.globalData.username || 'admin', [Validators.required, Validators.minLength(2)]], // 第一个参数是默认值
      password: ['123456', [Validators.required, Validators.minLength(4)]]
    });
  }

  login(user) {
    this.submitted = true;
    this.commonService.getToken(user.username, user.password).mergeMap(token => {
      this.globalData.token = token;
      this.storage.set('token', token);
      return this.commonService.getUserInfo();
    }).subscribe((userInfo: UserInfo) => {
      this.submitted = false;
      this.helper.loginSuccessHandle(userInfo);
      if (this.viewCtrl.isOverlay) {
        this.viewCtrl.dismiss();
      } else {
        this.navCtrl.setRoot(TabsPage); // 重新设置首页
      }
    }, () => {
      this.submitted = false;
    });
  }

  toRegister() {
    const modal = this.modalCtrl.create(RegisterPage);
    modal.present();
  }

  findPassword() {
    const modal = this.modalCtrl.create(FindPasswordPage);
    modal.present();
  }

  try() {
    this.globalData.token = 'test';
    const userInfo = {
      'id': 1,
      'username': 'admin',
      'mobileNumber': '13800003333',
      'email': 'admin@test.net',
      'realname': '张无忌',
      'departmentId': 1,
      'registerTime': '2017-11-24 08:46:54',
      'avatarId': null,
      'roles': [{
        'id': 2,
        'code': 'app_admin',
        'name': 'app管理员',
        'description': '',
        'clientType': 2,
        'resourceIds': null
      }]
    };
    this.helper.loginSuccessHandle(userInfo);
    if (this.viewCtrl.isOverlay) {
      this.viewCtrl.dismiss();
    } else {
      this.navCtrl.setRoot(TabsPage); // 重新设置首页
    }
  }
}
