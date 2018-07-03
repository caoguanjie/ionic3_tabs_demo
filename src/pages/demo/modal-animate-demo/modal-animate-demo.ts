import { ToastServiceProvider } from './../../../providers/toast-service/toast-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

/**
 * Generated class for the ModalAnimateDemoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
const items = [
  {name:"选项1",code:"1",isSelect:false},
  {name:"选项2",code:"1",isSelect:false},
  {name:"选项3",code:"1",isSelect:false},
  {name:"选项4",code:"1",isSelect:false},
  {name:"选项5",code:"1",isSelect:false},
  {name:"选项6",code:"1",isSelect:false},
  {name:"选项7",code:"1",isSelect:false},
];
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
    public toastCtrl:  ToastServiceProvider
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

  /**
   * 有头部，有底部的弹窗
   */
  click1(){
    this.toastCtrl.customModalRadioAlert('这个是个标题', items, undefined, false, true);
  }

  /**
   * 没头部，没底部
   */
  click2(){
    this.toastCtrl.customModalRadioAlert('这个是个标题', items, undefined, false, false);
  }
  
 /**
   * 多选
   */
  click3(){
    this.toastCtrl.customModalCheckboxAlert('这个是个标题', items);
  }
  
}
