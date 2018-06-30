import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ModalScalePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-scale',
  templateUrl: 'modal-scale.html',
})
export class ModalScalePage {
  items = [];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
  ) {
  }

  ionViewDidLoad() {
    this.items = [
      {name:"选项一",isSelect:false},
      {name:"选项2",isSelect:false},
      // {name:"选项3",isSelect:false},
      // {name:"选项4",isSelect:false},
      // {name:"选项5",isSelect:false},
      // {name:"选项6",isSelect:false},
      // {name:"选项7",isSelect:false}
    ]
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  changeValue(e,item){
    e.stopPropagation();
    item.isSelect = !item.isSelect;
  }
}
