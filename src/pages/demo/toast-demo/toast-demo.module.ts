import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ToastDemoPage } from './toast-demo';

@NgModule({
  declarations: [
    ToastDemoPage,
  ],
  imports: [
    IonicPageModule.forChild(ToastDemoPage),
  ],
})
export class ToastDemoPageModule {}
