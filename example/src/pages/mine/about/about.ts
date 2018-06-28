import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NativeService } from '../../../providers/NativeService';
import { UpdateLogPage } from '../update-log/update-log';
import { FeedBackListPage } from '../feed-back/feed-back-list';
import { VersionService } from '../../../providers/VersionService';
declare var AlloyLever;

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  currentVersionNo = '0.0.1';
  latestVersionNo = '0.0.1';
  lastVersionInfo: any = {};

  constructor(private navCtrl: NavController,
              private versionService: VersionService,
              private nativeService: NativeService) {
    this.loadVersionInfo();
  }


  ionViewDidEnter() {
    AlloyLever.entry('#entry3');
  }

  loadVersionInfo() {
    if (this.nativeService.isMobile()) {
      this.currentVersionNo = this.versionService.getCurrentVersionNo();
      this.latestVersionNo = this.versionService.getLatestVersionNo();
      this.lastVersionInfo = this.versionService.getLastVersionInfo();
    } else {
      this.nativeService.alert('请使用真机调试');
    }
  }

  checkNewVersion() {
    this.versionService.checkNewVersion();
    setTimeout(() => {
      this.loadVersionInfo();
    }, 4000);
  }

  updateLog() {
    this.navCtrl.push(UpdateLogPage);
  }

  features() {
    this.nativeService.alert(this.lastVersionInfo.introduction);
  }

  feedBack() {
    this.navCtrl.push(FeedBackListPage);
  }

}


