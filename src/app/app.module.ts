import { ModalFromRightEnter, ModalFromRightLeave, ModalScaleEnter, ModalScaleLeave } from './modal.transition';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler, Config } from 'ionic-angular';
import { MyApp } from './app.component';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CommonServiceProvider } from '../providers/common-service/common-service';
import { ToastServiceProvider } from '../providers/toast-service/toast-service';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      backButtonText:'',
      menuType: 'overlay',
      backButtonIcon:'ios-arrow-back',
      iconMode:'ios',
      tabsHideOnSubPages:'true', //从这个页面跳出去不带tab
      swipeBackEnabled:true //手势返回开关
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CommonServiceProvider,
    ToastServiceProvider
  ]
})
export class AppModule {
  constructor(public config: Config){
    this.setCustomTransition();
  }
   /**
    * 设置自定义的过渡动画
    */
  setCustomTransition():void{
    this.config.setTransition('modal-from-right-enter', ModalFromRightEnter);
    this.config.setTransition('modal-from-right-leave', ModalFromRightLeave);
    this.config.setTransition('modal-scale-enter', ModalScaleEnter);
    this.config.setTransition('modal-scale-leave', ModalScaleLeave);
  }
}
