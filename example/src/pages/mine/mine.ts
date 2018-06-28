import { Helper } from '../../providers/Helper';
import { Component } from '@angular/core';
import { MineEditPage } from './mine-edit/mine-edit';
import { MineEditAvatarModalPage } from './mine-edit-avatar-modal/mine-edit-avatar-modal';
import { AboutPage } from './about/about';
import { LoginPage } from '../login/login';
import { AlertController, Events, ModalController, NavController, Platform } from 'ionic-angular';
import { WorkMapPage } from './work-map/work-map';
import { SettingPage } from './setting/setting';
import { NativeService } from '../../providers/NativeService';
import { FileCachePage } from '../../shared/file-cache/file-cache';
import { GlobalData } from '../../providers/GlobalData';

@Component({
  selector: 'page-mine',
  templateUrl: 'mine.html'
})
export class MinePage {
  userInfo;

  constructor(public navCtrl: NavController,
              public platform: Platform,
              public helper: Helper,
              public modalCtrl: ModalController,
              public nativeService: NativeService,
              public globalData: GlobalData,
              private events: Events,
              public alertCtrl: AlertController) {
    this.userInfo = this.globalData.user;
    this.events.subscribe('user:login', userInfo => {
      this.userInfo = userInfo;
    });
  }

  edit() {
    this.navCtrl.push(MineEditPage);
  }

  setting() {
    this.navCtrl.push(SettingPage);
  }

  loginOut() {
    const modal = this.modalCtrl.create(LoginPage);
    modal.present();
    modal.onDidDismiss(userInfo => {
      if (userInfo) {
        this.userInfo = userInfo;
      }
    });
  }

  // 工作地图
  map() {
    this.navCtrl.push(WorkMapPage);
  }

  fileCache() {
    this.navCtrl.push(FileCachePage);
  }

  exitSoftware() {
    this.alertCtrl.create({
      title: '确认退出软件？',
      buttons: [{text: '取消'},
        {
          text: '确定',
          handler: () => {
            this.platform.exitApp();
          }
        }
      ]
    }).present();
  }

  about() {
    this.navCtrl.push(AboutPage);
  }

  viewAvatar() {
    this.modalCtrl.create(MineEditAvatarModalPage).present();
  }

  notice() {
    this.nativeService.alert('开发中...');
  }

}
