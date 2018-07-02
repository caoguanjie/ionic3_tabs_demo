import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastServiceProvider } from '../../../providers/toast-service/toast-service';

/**
 * Generated class for the ToastDemoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-toast-demo',
  templateUrl: 'toast-demo.html',
})
export class ToastDemoPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastServiceProvider,
  ) {
  }

  ionViewDidLoad() {
  }
  middleToast() {
    this.toastCtrl.tipsMiddle("您真的很帅")
  }
  bottomToast(){
    this.toastCtrl.tipsMiddle("我不信！！！！！！！！")
  }
}
