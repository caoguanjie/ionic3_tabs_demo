import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

/**
 * Generated class for the ModalAnimateDemoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-animate-demo',
  templateUrl: 'modal-animate-demo.html',
})
export class ModalAnimateDemoPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
  ) {
  }

  ionViewDidLoad() {
   
  }
  scaleModalScalePage() {
    this.modalCtrl.create("ModalScalePage", {}, {
      cssClass:"alertModal",
      enterAnimation: 'modal-scale-enter',
      leaveAnimation: 'modal-scale-leave'
    }).present();
  }
  presentModalFromRightPage() {
    this.modalCtrl.create("ModalFormRightPage", {}, {
      enterAnimation: 'modal-from-right-enter',
      leaveAnimation: 'modal-from-right-leave'
    }).present();
  }
}
