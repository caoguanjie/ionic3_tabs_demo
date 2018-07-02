
import { Injectable } from '@angular/core';
import { AlertController, ToastController } from 'ionic-angular';

/*
  Generated class for the ToastServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ToastServiceProvider {

  constructor(
    public alertCtrl: AlertController,
    private toastCtrl: ToastController,
  ) {
  }
  //中部的消息提示
  tipsMiddle(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 1500,
      cssClass: 'myToastStyle',
      position: 'middle'
    });
    toast.present();
    return toast;
  }

  //中部的消息提示
  tipsBottom(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 1500,
      cssClass: 'myToastStyle',
      position: 'bottom'
    });
    toast.present();
    return toast;
  }
}
