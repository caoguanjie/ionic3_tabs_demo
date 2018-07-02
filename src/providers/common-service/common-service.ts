
import { Injectable } from '@angular/core';
import { Platform, Keyboard, IonicApp, Nav } from 'ionic-angular';
import { ToastServiceProvider } from '../toast-service/toast-service';

/*
这是公共的一些方法
*/
@Injectable()
export class CommonServiceProvider {
  //控制硬件返回按钮是否触发，默认false
  private backButtonPressed: boolean = false;
  constructor(
    public platform: Platform,
    public keyboard: Keyboard,
    public toastCtrl: ToastServiceProvider
  ) {
  }

  /**
   * 正则判断字符串是否为非空数字类型
   */
  isNumberType(str: any) {
    let reg = new RegExp(/^(0|\+?[1-9][0-9]*)$/),
      res;
    res = (reg.test(str)) ? true : false;
    return res;
  }
  /**
   * 判断是否是json格式
   * @param str 传入字符串
   */
  isJSON(str): boolean {
    if (typeof str == 'string') {
      try {
        JSON.parse(str);
        return true;
      } catch (e) {
        return false;
      }
    }
  }
  /**
   * 是否真机环境
   */
  isMobile(): boolean {
    return this.platform.is('mobile') && !this.platform.is('mobileweb');
  }

  /**
   * 是否android真机环境
   */
  isAndroid(): boolean {
    return this.isMobile() && this.platform.is('android');
  }

  /**
   * 是否ios真机环境
   */
  isIos(): boolean {
    return this.isMobile() && (this.platform.is('ios') || this.platform.is('ipad') || this.platform.is('iphone'));
  }
  /**
   * 是否改变表单的值方法,新建表单数据
   * 如果新建表单有默认数据，不要传过来。
   * @param formValue 把这个表对象传过来
   */
  isChangeFormValue(formValue: object): boolean {
    for (let i in formValue) {
      if (formValue[i] != undefined) {
        if (formValue[i].length != 0) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   *  是否改变表单的值方法,编辑，表单数据
   * @param formNewValues 表单的新数据
   * @param formOldValues 表单的原始数据
   */
  isChangeEditFormValue(formNewValues: object, formOldValues: object): boolean {
    //返回值是一个数组，其中包含对象自己的属性的名称
    let formNewValue = Object.getOwnPropertyNames(formNewValues);
    let formOldValue = Object.getOwnPropertyNames(formOldValues);
    if (formOldValue.length != formNewValue.length) {
      return true;
    }
    for (let i = 0; i < formOldValue.length; i++) {
      var propName = formOldValue[i];
      if (typeof (formNewValues[propName]) === "string") {
        if (formNewValues[propName].trim() !== formOldValues[propName].trim()) {
          return true;
        }
      } else {
        if (formOldValues[propName] !== formNewValues[propName]) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * 全局注册返回按钮事件并监控的流程是：
   * 1、在app.comonpent.ts文件中，新增属性装饰器 @ViewChild('myNav') nav: Nav;把#myNav该属性添加到app.html中<ion-nav #myNav></ion-nav>
   * 2、在tab.ts中同样添加属性装饰器 @ViewChild('mainTabs') tabs:Tabs;在tab.html添加<ion-tabs #mainTabs></ion-tabs>
   * @ViewChild('myNav') nav: Nav;
   * @param nav 直接传入标签属性
   * @param ionicApp，从app.comonpent传过来，不能在该服务中注入，会报错。其他服务也不能导入这个模块，不然也会报错。
   */
  registerBackButtonAction(nav: Nav, ionicApp: IonicApp): void {
    this.platform.registerBackButtonAction(() => {
      let activeVC = nav.getActive();
      let page = activeVC.instance;

      //隐藏modal
      let activePortal = ionicApp._overlayPortal.getActive() || ionicApp._loadingPortal.getActive() || ionicApp._modalPortal.getActive();
      if (activePortal) {
        activePortal.dismiss();
        return;
      }

      if (this.keyboard.isOpen()) {//如果键盘开启则隐藏键盘
        this.keyboard.close();
        return;
      }

      // if (activeVC.component.name == 'LoginPage') {
      //   return this.showExit();
      // }
      if (page.tabs) {
        let activeNav = page.tabs.getSelected();
        if (activeNav.canGoBack()) {
          return activeNav.pop();
        } else {
          return this.showExit();
        }
      } else {
        return this.showExit();
      }
    }, 1);
  }
  //双击退出提示框
  showExit(): void {
    if (this.backButtonPressed) { //当触发标志为true时，即2秒内双击返回按键则退出APP
      this.platform.exitApp();
    } else {
      this.toastCtrl.tipsMiddle("再按一次退出程序");
      this.backButtonPressed = true;
      setTimeout(() => this.backButtonPressed = false, 2000);//2秒内没有再次点击返回则将触发标志标记为false
    }
  }

}
