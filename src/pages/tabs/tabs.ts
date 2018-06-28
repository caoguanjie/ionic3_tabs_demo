import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  demoRoot = "DemoPage";
  tab2Root = "Tab2Page";
  tab3Root = "Tab3Page";

  constructor() {

  }
}
