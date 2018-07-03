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
  packages: RadioAlert;
  lastItemIndex:number; //上一个索引
  currentItemIndex:number;//当前索引
  resultArray:string[] = [];//存放结果数组
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
  ) {
    this.packages = this.navParams.data;
  }

  ionViewDidLoad() {
    this.items = [
      {name:"选项1",code:"1",isSelect:false},
      {name:"选项2",code:"1",isSelect:false},
      {name:"选项3",code:"1",isSelect:false},
      {name:"选项4",code:"1",isSelect:false},
      {name:"选项5",code:"1",isSelect:false},
      {name:"选项6",code:"1",isSelect:false},
      {name:"选项7",code:"1",isSelect:false},
    ];
    this.packages.radioArray.forEach((element,key) => {
      if(element.isSelected){
        this.lastItemIndex = key;
      }
    })
  }
  changeValue(e:any,item:any,index:number){
    e.stopPropagation();
    if(this.packages.type && this.packages.type == 'radio'){
      this.isRadio(item,index);
      if(!this.packages.radioArray[index].isSelected){
        this.packages.radioArray[index].isSelected = true;
      }
      // this.packages.radioArray[index].isSelected =  !this.packages.radioArray[index].isSelected;
    }else{
      this.packages.radioArray[index].isSelected =  !this.packages.radioArray[index].isSelected;
    }
    if(!this.packages.isShowBtn){//去除底部按钮
      this.resultArray = [];
      this.resultArray.push(item.code);
      this.ok();
    }
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  ok(){
    if(this.packages.type && this.packages.type == 'checkbox'){
      this.resultArray =[];
      this.packages.radioArray.forEach(element => {
        if(element.isSelected){
          this.resultArray.push(element.code);
        }
      });
    }
    if(this.packages.radioArray[0].name == '请选择' && this.packages.radioArray[0].isSelected){
      this.viewCtrl.dismiss(null);
      return;
    }
    this.viewCtrl.dismiss(this.resultArray);
  }

  isRadio(item:any,index:number){
    if(this.lastItemIndex >= 0){
      if(this.lastItemIndex === index){
        return;
      }
      this.packages.radioArray[this.lastItemIndex].isSelected =  false;
      this.resultArray = [];
      this.resultArray.push(item.code);
      this.lastItemIndex = index;
    }else{
      this.lastItemIndex = index;
      this.resultArray.push(item.code);
    }
  }

  isShowBtn(item:any){
    //只有单选才能去掉底部按钮
    if(this.packages.type === 'radio'){
      this.resultArray = [];
      this.resultArray.push(item.code);
      if(this.packages.radioArray[0].name == '请选择' && this.packages.radioArray[0].isSelected){
        this.viewCtrl.dismiss(null);
        return;
      }
      this.viewCtrl.dismiss(this.resultArray);
    }
  }
}
