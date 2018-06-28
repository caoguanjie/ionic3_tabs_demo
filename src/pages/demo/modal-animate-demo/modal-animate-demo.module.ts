import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalAnimateDemoPage } from './modal-animate-demo';

@NgModule({
  declarations: [
    ModalAnimateDemoPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalAnimateDemoPage),
  ],
})
export class ModalAnimateDemoPageModule {}
