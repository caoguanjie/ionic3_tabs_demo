import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalScalePage } from './modal-scale';

@NgModule({
  declarations: [
    ModalScalePage,
  ],
  imports: [
    IonicPageModule.forChild(ModalScalePage),
  ],
})
export class ModalScalePageModule {}
