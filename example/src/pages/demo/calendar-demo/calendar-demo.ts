import { Component } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';
import { NativeService } from '../../../providers/NativeService';
import { CalendarModal, CalendarModalOptions } from 'ion2-calendar';

/**
 * Generated class for the CalendarDemoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-calendar-demo',
  templateUrl: 'calendar-demo.html',
})
export class CalendarDemoPage {
  dateRangeStr = '';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              private nativeService: NativeService) {
  }

  openCalendar() {
    const from = new Date();
    from.setMonth(from.getMonth() - 6); // 半年前
    const options: CalendarModalOptions = {
      title: '',
      pickMode: 'range',
      closeLabel: '关闭',
      doneLabel: '确定',
      monthFormat: 'YYYY 年 MM 月 ',
      weekdays: ['天', '一', '二', '三', '四', '五', '六'],
      // from: from,//可选范围,默认从今天开始可选
      // defaultDateRange: { //默认选中范围
      //   from: new Date(2017, 11, 1),
      //   to: new Date(2017, 11, 11)
      // }
    };

    const myCalendar = this.modalCtrl.create(CalendarModal, {
      options
    });


    myCalendar.present();

    myCalendar.onDidDismiss(date => {
      console.log(date);
    });
  }

  details(url) {
    this.nativeService.openUrlByBrowser(url);
  }
}
