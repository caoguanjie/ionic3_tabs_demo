
import { Injectable } from '@angular/core';
import { AlertController, ToastController, ModalController } from 'ionic-angular';

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
    public modalCtrl: ModalController
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
   /**
   * 自定义的单选弹窗服务，通过modal组件改装
   * 确定按钮，返回选中值，如果是确定，然后又是【请选择】选项，就返回null值
   * 取消按钮，不返回值
   * @param title 单选弹窗的标题
   * @param dataArray 单选弹窗的数据,{name:"弹窗选项的中文名",code:"每个选项对应的值",isSelected:"是否选中"}
   * @param defaults 单选弹窗的单选默认值
   * @param required 该单选是否是必填项 默认是false
   * @param isShowBtn 是否显示底部按钮
   */
  customModalRadioAlert(title: string, dataArray: any, defaults?: string,required: boolean = false,isShowBtn:boolean = true): Promise<any>{

    let arr = [];
    dataArray.forEach(element => {
      if( defaults && element.name === defaults){
        arr.push({name: element.name, code:element.code, isSelected: true});
      }else{
        arr.push({name: element.name, code:element.code, isSelected: false});
      }
    });
    if(!required){
      if(defaults == ''){
        arr.unshift({name:"请选择",code:"请选择",isSelected:true})
      }else{
        arr.unshift({name:"请选择",code:"请选择",isSelected:false})
      }
    }
    let packages: RadioAlert = {
      title: title,
      radioArray:arr,
      type:'radio',
      isShowBtn:isShowBtn,
      isRequired: required
    }
    let pages = this.modalCtrl.create('ModalScalePage', packages, {
      cssClass:"alertModal",
      enterAnimation: 'modal-scale-enter',
      leaveAnimation: 'modal-scale-leave'
    });
    pages.present();
    return new Promise((resolve) => {
      pages.onDidDismiss(data => {
        if(data === null){
          //如果是选择请选择就是null值，如果单纯是取消，就不返回值。
          resolve(null);
        }else if(data){
          resolve(data);
        }
        console.log("单选我肯定传空值",data)
      })
    })
  }

  /**
   * 自定义的多选弹窗服务，通过modal组件改装
   * 确定按钮，返回选中值
   * 取消按钮，
   * @param title 多选弹窗的标题
   * @param dataArray 多选弹窗的数据RadioAlertInputOptions类型，{name:"弹窗选项的中文名",code:"每个选项对应的值",isSelected:"选择情况"}
   */
  customModalCheckboxAlert(title: string, dataArray: any): Promise<any>{
    let arr = [];
    dataArray.forEach(element => {
      arr.push({name: element.name, code:element.code, isSelected: element.isSelected});
    });
    let packages: RadioAlert = {
      title: title,
      radioArray: arr,
      type:'checkbox',
      isShowBtn:true,
      isRequired: true
    }
    let pages = this.modalCtrl.create('ModalScalePage', packages, {
      cssClass:"alertModal",
      enterAnimation: 'modal-scale-enter',
      leaveAnimation: 'modal-scale-leave'
    });
    pages.present();
    return new Promise((resolve) => {
      pages.onDidDismiss(data => {
        if(data){
          //如果是选择请选择就是null值，如果单纯是取消，就不返回值。
          resolve(data);
        }
        console.log("多选我肯定传空值",data)
      })
    })
  }
}
