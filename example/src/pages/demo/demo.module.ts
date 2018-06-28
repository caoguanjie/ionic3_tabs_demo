import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { DemoPage } from './demo';
import { PaginationDemoPage } from './pagination-demo/pagination-demo';
import { CustomIconDemoPage } from './custom-icon-demo/custom-icon-demo';
import { EchartsDemoPage } from './echarts-demo/echarts-demo';
import { SelectPicDemoPage } from './select-pic-demo/select-pic-demo';
import { CustomPipeDemo } from './custom-pipe-demo/custom-pipe-demo';
import { Conversion } from '../../pipes/conversion';
import { PagingPageModule } from '../../shared/paging/paging.module';
import { SelectPicturePageModule } from '../../shared/select-picture/select-picture.module';
import { ModalScalePageModule } from './transition-demo/modal-scale/modal-scale.module';
import { ModalFromRightPageModule } from './transition-demo/modal-from-right/modal-from-right.module';
import { TransitionDemoPageModule } from './transition-demo/transition-demo.module';
import { CropPicDemoPage } from './crop-pic-demo/crop-pic-demo';
import { CityPickerDemoPage } from './city-picker-demo/city-picker-demo';
import { CityPickerModule } from 'ionic2-city-picker';
import { DemoService } from './DemoService';
import { CalendarModule } from 'ion2-calendar';
import { CalendarDemoPage } from './calendar-demo/calendar-demo';
import { NativeDemoPage } from './native-demo/native-demo';
import { FileCacheDemoPage } from './file-cache-demo/file-cache-demo';
import { PermissionDemoPage } from './permission-demo/permission-demo';
import { PatrolTaskPage } from './permission-demo/patrol-task/patrol-task';
import { CustomerListPage } from './permission-demo/customer-list/customer-list';
import { QrcodeDemoPage } from './qrcode-demo/qrcode-demo';
import { AllowleverDemoPage } from './allowlever-demo/allowlever-demo';

@NgModule({
  imports: [IonicModule, PagingPageModule, SelectPicturePageModule, TransitionDemoPageModule, ModalScalePageModule, ModalFromRightPageModule, CityPickerModule, CalendarModule],
  declarations: [DemoPage, PermissionDemoPage, PatrolTaskPage, CustomerListPage, PaginationDemoPage, CustomIconDemoPage, EchartsDemoPage, SelectPicDemoPage, CustomPipeDemo, Conversion, CropPicDemoPage, CityPickerDemoPage, CalendarDemoPage, NativeDemoPage, FileCacheDemoPage, QrcodeDemoPage, AllowleverDemoPage],
  entryComponents: [DemoPage, PermissionDemoPage, PatrolTaskPage, CustomerListPage, PaginationDemoPage, CustomIconDemoPage, EchartsDemoPage, SelectPicDemoPage, CustomPipeDemo, CropPicDemoPage, CityPickerDemoPage, CalendarDemoPage, NativeDemoPage, FileCacheDemoPage, QrcodeDemoPage, AllowleverDemoPage],
  providers: [DemoService],
  exports: [IonicModule]
})
export class DemoModule {
}
