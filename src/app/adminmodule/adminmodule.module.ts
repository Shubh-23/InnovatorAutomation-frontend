import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminmoduleRoutingModule } from './adminmodule-routing/adminmodule-routing.module';
import { SharedModule } from '../sharedmodule/shared.module';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DateformatePipe } from './pipe/dateformate.pipe';
// import { DateFormatePipe } from './pipe/date-formate.pipe';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    DashboardComponent,
    DateformatePipe
  ],
  imports: [
    CommonModule,AdminmoduleRoutingModule,SharedModule,


  ],
  providers: [DatePipe]
})
export class AdminmoduleModule { }
