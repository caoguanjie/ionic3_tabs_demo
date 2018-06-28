import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { HomePage } from './home';

@NgModule({
  imports: [IonicModule],
  declarations: [HomePage],
  entryComponents: [HomePage],
  providers: [],
  exports: [IonicModule]
})
export class HomeModule {
}
