import { Component, ViewChild } from '@angular/core';
import { Platform, IonicApp, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CommonServiceProvider } from '../providers/common-service/common-service';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = "TabsPage";
  @ViewChild('myNav') nav: Nav;
  constructor(
    platform: Platform, 
    statusBar: StatusBar,
    ionicApp: IonicApp, 
    splashScreen: SplashScreen,
    public commonCtrl: CommonServiceProvider
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.commonCtrl.registerBackButtonAction(this.nav, ionicApp);//注册返回按键事
    });
  }
}
